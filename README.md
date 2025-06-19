# Conversaciones con la Historia — APP de Escritorio

Aplicación educativa construida con Electron, React y Node.js. Funciona de forma offline y está pensada para entornos escolares.

## Estructura del repositorio

- **backend/** – API REST en Node.js + Express y base SQLite.
- **frontend/** – Frontend React y scripts de Electron.
- **docker/** – Archivos para despliegue con Docker.
- **scripts/** – utilidades de respaldo y restauración.

## Requisitos para desarrollo

- Node.js 18+
- [Ollama](https://ollama.com/download) para el motor de IA local (ejecutar `ollama pull llama3`).

## Uso en desarrollo

Instala dependencias de todos los paquetes:

```bash
npm install
```

Arranca backend, frontend y Electron de forma simultánea:

```bash
npm run dev
```

## Empaquetado

Genera el instalador para Windows o Linux con:

```bash
npm run package:win    # Windows
npm run package:linux  # Linux
```

Los archivos se ubicarán en `frontend/dist` y el instalador en `release/`.

## Respaldo y restauración manual

```bash
node scripts/backup.js [ruta_destino]
node scripts/restore.js [carpeta_backup]
```

La aplicación realiza un backup automático al salir y conserva varios respaldos en la carpeta *Documentos/backups_historia_auto*.
