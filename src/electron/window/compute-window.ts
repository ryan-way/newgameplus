import { BaseWindow, defaultWindowConfig } from './base-window';
import { COMPUTE_INDEX_PATH } from './constants';

export class ComputeWindow extends BaseWindow {
  getWindowConfig() {
    const config = defaultWindowConfig;
    config.show = false;
    return config;
  }

  Ready() {
    this.createWindow();
    this.window.webContents.openDevTools();
    this.window.loadFile(COMPUTE_INDEX_PATH);
  }
}
