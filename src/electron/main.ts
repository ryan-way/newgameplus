import contextMenu from 'electron-context-menu';
import { ipcMain } from 'electron';
import { MainWindow } from './window';

import { router } from './router/main';
import { createIPCHandler } from 'electron-trpc';

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

class Main {
  async start() {
    createIPCHandler({ ipcMain, router });
    const window = new MainWindow();
    window.Ready();
  }
}

const main = new Main();
main.start();
