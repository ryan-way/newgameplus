import { app, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import path from 'path';
import windowStateManager from 'electron-window-state';

const port = process.env.PORT || 5173;
const dev = app ? !app.isPackaged : false;

export class MainWindowService {
  private main;
  private windowState;

  serveURL = serve({ directory: '.' });

  loadVite() {
    this.main.loadURL(`http://localhost:${port}`).catch(e => {
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

  public static instance = new MainWindowService();

  public static startWindowService() {
    app.once('ready', () => {
      MainWindowService.instance.windowState = windowStateManager({
        defaultWidth: 800,
        defaultHeight: 600,
      });

      MainWindowService.instance.main = MainWindowService.instance.getWindow(
        true,
        path.join(__dirname, '..', 'preload', 'preload.cjs')
      );
      MainWindowService.instance.main.once('ready-to-show', () => {
        MainWindowService.instance.main.show();
        MainWindowService.instance.main.focus();
      });

      MainWindowService.instance.main.on('close', () => {
        MainWindowService.instance.windowState.saveState(MainWindowService.instance.main);
      });

      if (dev) MainWindowService.instance.loadVite();
      else MainWindowService.instance.serveURL(MainWindowService.instance.main);
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }
}

export default MainWindowService.startWindowService as startWindowService;
