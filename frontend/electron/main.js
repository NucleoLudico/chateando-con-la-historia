const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { execFile } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../public/icon.png'),
  });

  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
}

ipcMain.handle('hacer-backup', async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Guardar respaldo',
    defaultPath: path.join(app.getPath('documents'), 'backup_historia_' + new Date().toISOString().replace(/[:.]/g, '_')),
    buttonLabel: 'Guardar Backup'
  });
  if (canceled) return { ok: false };
  return new Promise((resolve) => {
    execFile('node', [path.join(__dirname, '../scripts/backup.js'), filePath], (err, stdout, stderr) => {
      if (err) resolve({ ok: false, error: stderr || err.message });
      else resolve({ ok: true, msg: stdout });
    });
  });
});

ipcMain.handle('hacer-restore', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Selecciona carpeta de backup',
    properties: ['openDirectory']
  });
  if (canceled || !filePaths[0]) return { ok: false };
  return new Promise((resolve) => {
    execFile('node', [path.join(__dirname, '../scripts/restore.js'), filePaths[0]], (err, stdout, stderr) => {
      if (err) resolve({ ok: false, error: stderr || err.message });
      else resolve({ ok: true, msg: stdout });
    });
  });
});

function backupOnExit() {
  const dir = path.join(app.getPath('documents'), 'backups_historia_auto');
  const target = path.join(dir, 'backup_' + new Date().toISOString().replace(/[:.]/g, '_'));
  return new Promise((resolve) => {
    execFile('node', [path.join(__dirname, '../scripts/backup.js'), target], (err) => {
      if (!err && mainWindow) {
        mainWindow.webContents.send('backup-realizado', 'Backup automático realizado al salir.');
      }
      resolve();
    });
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('before-quit', async (e) => {
  e.preventDefault();
  await backupOnExit();
  app.exit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
