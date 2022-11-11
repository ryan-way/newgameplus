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

exposeElectronTRPC({ contextBridge, ipcRenderer });
