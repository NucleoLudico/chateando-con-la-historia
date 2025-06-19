/**
 * Script de respaldo para "Conversaciones con la Historia"
 * Copia la base de datos y carpetas esenciales a una ruta de destino.
 */
const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../backend/database.sqlite');
const RESOURCES_PATH = path.resolve(__dirname, '../backend/archivos');
const destRoot = process.argv[2] || path.resolve(__dirname, '../backups/backup_' + new Date().toISOString().replace(/[:.]/g, '_'));

if (!fs.existsSync(destRoot)) fs.mkdirSync(destRoot, { recursive: true });

const dbDest = path.join(destRoot, 'database.sqlite');
if (fs.existsSync(DB_PATH)) fs.copyFileSync(DB_PATH, dbDest);

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
copyDir(RESOURCES_PATH, path.join(destRoot, 'archivos'));

console.log(`Backup completado en: ${destRoot}`);
