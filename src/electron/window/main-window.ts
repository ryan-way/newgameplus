import { app } from 'electron';
import serve from 'electron-serve';
import windowStateManager, { State } from 'electron-window-state';
import { BaseWindow, defaultWindowConfig } from './base-window';
import { BrowserWindowConstructorOptions } from 'electron';
import { LOCALHOST } from './constants';

const dev = app ? !app.isPackaged : false;

export class MainWindow extends BaseWindow {
  private windowState: State;

  constructor() {
    super();
  }

  Ready() {
    app.once('ready', () => {
      this.CreateWindowStateManager();
      this.createWindow();
      this.ReadyToShow();
      this.RegisterClose();
      this.Serve();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }

  CreateWindowStateManager() {
    this.windowState = windowStateManager({
      defaultWidth: 800,
      defaultHeight: 600,
    });
  }

  getWindowConfig(): BrowserWindowConstructorOptions {
    const config = defaultWindowConfig;
    config.show = true;
    config.x = this.windowState.x;
    config.x = this.windowState.x;
    config.width = this.windowState.width;
    config.height = this.windowState.height;
    return config;
  }

  ReadyToShow() {
    this.window.once('ready-to-show', () => {
      this.window.show();
      this.window.focus();
    });
  }

  RegisterClose() {
    this.window.on('close', () => {
      this.windowState.saveState(this.window);
    });
  }

  Serve() {
    if (dev) this.loadVite();
    else this.serveURL(this.window);
  }

  serveURL = serve({ directory: '.' });

  loadVite() {
    this.window.loadURL(LOCALHOST).catch(e => {
      setTimeout(() => {
        this.loadVite();
      }, 200);
    });
  }
}
