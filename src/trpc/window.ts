import { BrowserWindow } from 'electron';
import path from 'path';

export class WindowService {
  getProcessWindow() {
    const process = path.join(__dirname, '..', 'compute-preload', 'preload.cjs');
    return this.getWindow(true, process);
  }

  closeWindow(win: BrowserWindow) {
    win.destroy();
  }

  public static instance = new WindowService();

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
    });
    win.webContents.openDevTools();
    win.loadFile('../compute/index.html');

    return win;
  }
}
