// Require for typeorm
import 'reflect-metadata';
import contextMenu from 'electron-context-menu';
import { ipcMain } from 'electron';
import windowService from './window-service';

import { router } from './trpc';
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

    windowService.startMainWindow();
  }
}

const main = new Main();
main.start();
