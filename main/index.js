const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const db = require(path.join(__dirname, '../database/db.js'));

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

ipcMain.handle('get-tasks', () => db.getTasks());
ipcMain.handle('add-task', (event, task) => db.addTask(task));

app.whenReady().then(createWindow);

app.on('window-all-closed', ()=> {
    if (process.platform !== 'darwin') app.quit();
})

