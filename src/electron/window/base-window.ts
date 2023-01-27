import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { PRELOAD_PATH } from './constants';

export const defaultWindowConfig: BrowserWindowConstructorOptions = {
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
    preload: PRELOAD_PATH,
  },
};

export abstract class BaseWindow {
  protected window: BrowserWindow;

  protected createWindow() {
    this.window = new BrowserWindow(this.getWindowConfig());
  }
  abstract getWindowConfig(): BrowserWindowConstructorOptions;
  abstract Ready(): void;

  destroy() {
    this.window.destroy();
  }
}
