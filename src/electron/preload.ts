import { ContextBridge, IpcRenderer } from 'electron';
import { contextBridge, ipcRenderer } from 'electron';
import { ProcedureType } from '@trpc/server';

export interface TRPCHandlerArgs {
  path: string;
  type: ProcedureType;
  input?: unknown;
}

export const exposeElectronTRPC = ({
  contextBridge,
  ipcRenderer,
}: {
  contextBridge: ContextBridge;
  ipcRenderer: IpcRenderer;
}) => {
  return contextBridge.exposeInMainWorld('electronTRPC', {
    rpc: (args: TRPCHandlerArgs) => ipcRenderer.invoke('electron-trpc', args),
  });
};

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  sendSync: (channel, data) => {
    ipcRenderer.sendSync(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});

exposeElectronTRPC({ contextBridge, ipcRenderer });
