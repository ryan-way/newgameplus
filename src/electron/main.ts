// Require for typeorm
import 'reflect-metadata';
import windowStateManager from 'electron-window-state';
import contextMenu from 'electron-context-menu';
import { app, BrowserWindow, ipcMain } from 'electron';
import serve from 'electron-serve';
import path from 'path';

import db from './data-source';
import { User } from './data-source';

import { router } from './trpc';
import { PrismaClient } from '@prisma/client';
import { createIPCHandler } from 'electron-trpc';

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;
let mainWindow;

class Main {
  async start() {
    const prisma = new PrismaClient();

    const count = await prisma.count.findFirst();
    console.log(count);
    createIPCHandler({ ipcMain, router });
  }
}

const main = new Main();
main.start();

function createWindow() {
  const windowState = windowStateManager({
    defaultWidth: 800,
    defaultHeight: 600,
  });

  const mainWindow = new BrowserWindow({
    backgroundColor: 'whitesmoke',
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    trafficLightPosition: {
      x: 17,
      y: 32,
    },
    minHeight: 450,
    minWidth: 500,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      spellcheck: false,
      devTools: true,
      preload: path.join(__dirname, '..', 'preload', 'preload.cjs'),
    },
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
  });

  mainWindow.webContents.openDevTools();

  windowState.manage(mainWindow);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('close', () => {
    windowState.saveState(mainWindow);
  });

  return mainWindow;
}

contextMenu({
  showLookUpSelection: false,
  showSearchWithGoogle: false,
  showCopyImage: false,
  prepend: () => [
    {
      label: 'Make App 💻',
    },
  ],
});

function loadVite(port) {
  mainWindow.loadURL(`http://localhost:${port}`).catch(e => {
    console.log('Error loading URL, retrying', e);
    setTimeout(() => {
      loadVite(port);
    }, 200);
  });
}

function createMainWindow() {
  mainWindow = createWindow();
  mainWindow.once('close', () => {
    mainWindow = null;
  });

  if (dev) loadVite(port);
  else serveURL(mainWindow);
}

app.once('ready', createMainWindow);
app.on('activate', () => {
  if (!mainWindow) {
    createMainWindow();
  }
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('to-main', (event, count) => {
  return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
});
