const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Métodos seguros pueden ser añadidos aquí
});
