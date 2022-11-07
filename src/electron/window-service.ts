import { app, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import path from 'path';
import windowStateManager from 'electron-window-state';

const port = process.env.PORT || 3000;
const dev = !app.isPackaged;

export class WindowService {
  private main;
  private windowState;

  startMainWindow() {
    app.once('ready', () => {
      this.windowState = windowStateManager({
        defaultWidth: 800,
        defaultHeight: 600,
      });

      this.main = this.getWindow(true);
      this.main.once('ready-to-show', () => {
        this.main.show();
        this.main.focus();
      });

      this.main.on('close', () => {
        this.windowState.saveState(this.main);
      });

      if (dev) this.loadVite();
      else this.serveURL(this.main);
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }

  serveURL = serve({ directory: '.' });

  loadVite() {
    this.main.loadURL(`http://localhost:${port}`).catch(e => {
      console.log('Error loading URL, retrying', e);
      setTimeout(() => {
        this.loadVite();
      }, 200);
    });
  }

  getProcessWindow() {
    return this.getWindow(false);
  }

  getWindow(show: boolean) {
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
        preload: path.join(__dirname, '..', 'preload', 'preload.cjs'),
      },
      x: this.windowState.x,
      y: this.windowState.y,
      width: this.windowState.width,
      height: this.windowState.height,
    });
    this.windowState.manage(win);

    return win;
  }
}

const windowService = new WindowService();
export default windowService;
