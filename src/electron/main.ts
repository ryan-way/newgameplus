// Require for typeorm
import 'reflect-metadata';
import windowStateManager from 'electron-window-state';
import contextMenu from 'electron-context-menu';
import { app, BrowserWindow, ipcMain } from 'electron';
import serve from 'electron-serve';
import path from 'path';

import db from './data-source';
import { User } from './data-source';

import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import appRouter from './trpc';
import cors from 'cors';

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;
let mainWindow;

function initializeTypeOrm() {
  db.authenticate()
    .then(async () => {
      const [user, created] = await User.findOrCreate({
        where: { id: 1, firstName: 'ryan', lastName: 'way' },
      });
      console.log('User found: ', user.firstName, user.lastName);
      console.log('User was created? ', created);
    })
    .catch(err => console.error(err));
}

function initializeTrpc() {
  const app = express();

  app.use((req, res, next) => {
    console.log('Express', req.method, req.path, req.body ?? req.query);

    next();
  });
  app.use(cors());
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    })
  );

  app.get('/', (_req, res) => res.send('hello'));

  app.listen(3001, () => {
    console.log('Express listening on port 3001');
  });
}

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

  initializeTypeOrm();
  initializeTrpc();
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
