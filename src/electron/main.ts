import contextMenu from 'electron-context-menu';
import { ipcMain } from 'electron';
import startWindowService from './window';

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
    startWindowService();
  }
}

const main = new Main();
main.start();
