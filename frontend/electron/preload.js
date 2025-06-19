const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  backup: () => ipcRenderer.invoke('hacer-backup'),
  restore: () => ipcRenderer.invoke('hacer-restore'),
});

ipcRenderer.on('backup-realizado', (_event, msg) => {
  window.dispatchEvent(new CustomEvent('backup-realizado', { detail: msg }));
});
