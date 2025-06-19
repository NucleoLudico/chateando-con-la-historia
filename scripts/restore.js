/**
 * Restaurar base de datos y archivos desde una carpeta de backup.
 */
const fs = require('fs');
const path = require('path');

const sourceRoot = process.argv[2];
if (!sourceRoot || !fs.existsSync(sourceRoot)) {
  console.error('Debes indicar la carpeta de backup.');
  process.exit(1);
}
const DB_PATH = path.resolve(__dirname, '../backend/database.sqlite');
const RESOURCES_PATH = path.resolve(__dirname, '../backend/archivos');

const dbBackup = path.join(sourceRoot, 'database.sqlite');
if (fs.existsSync(dbBackup)) {
  fs.copyFileSync(dbBackup, DB_PATH);
  console.log('Base de datos restaurada.');
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.lstatSync(srcPath).isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}
copyDir(path.join(sourceRoot, 'archivos'), RESOURCES_PATH);

console.log('Restauración completa.');
