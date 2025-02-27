const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getTasks: () => ipcRenderer.invoke('get-tasks'),
    addTask: (task) => ipcRenderer.invoke('add-task', task)
});