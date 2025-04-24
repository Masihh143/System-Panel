const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  getCpuUsage: () => ipcRenderer.invoke('get-cpu-usage'),
  getMemoryStats: () => ipcRenderer.invoke('get-memory-stats'),
  getTopProcesses: () => ipcRenderer.invoke('get-top-processes') 
});