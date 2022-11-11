import { app, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import path from 'path';
import windowStateManager from 'electron-window-state';

const port = process.env.PORT || 5173;
const dev = app ? !app.isPackaged : false;

export class WindowService {
  private main;
  private windowState;

  serveURL = serve({ directory: '.' });

  loadVite() {
    this.main.loadURL(`http://localhost:${port}`).catch(e => {
      console.log('Error loading URL, retrying', e);
      setTimeout(() => {
        this.loadVite();
      }, 200);
    });
  }

  getWindow(show: boolean, preload: string) {
    const win = new BrowserWindow({
      show: show,
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
        preload: preload,
      },
      x: this.windowState.x,
      y: this.windowState.y,
      width: this.windowState.width,
      height: this.windowState.height,
    });
    this.windowState.manage(win);
    win.webContents.openDevTools();

    return win;
  }

  public static instance = new WindowService();

  public static startWindowService() {
    app.once('ready', () => {
      WindowService.instance.windowState = windowStateManager({
        defaultWidth: 800,
        defaultHeight: 600,
      });

      WindowService.instance.main = WindowService.instance.getWindow(
        true,
        path.join(__dirname, '..', 'preload', 'preload.cjs')
      );
      WindowService.instance.main.once('ready-to-show', () => {
        WindowService.instance.main.show();
        WindowService.instance.main.focus();
      });

      WindowService.instance.main.on('close', () => {
        WindowService.instance.windowState.saveState(WindowService.instance.main);
      });

      if (dev) WindowService.instance.loadVite();
      else WindowService.instance.serveURL(WindowService.instance.main);
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }
}

export default WindowService.startWindowService as startWindowService;
