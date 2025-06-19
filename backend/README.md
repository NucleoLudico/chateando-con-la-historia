# Conversaciones con la Historia - Backend

## 🚀 Requisitos
- Node.js v18+
- npm
- (Opcional) Docker
- SQLite3

## ⚙️ Instalación

1. Clona este repositorio y entra a la carpeta `backend`:

```bash
git clone <repo-url>
cd conversaciones-historia/backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Copia el archivo de entorno:

```bash
cp .env.example .env
# Edita el JWT_SECRET si lo deseas
```

4. Inicia el servidor (modo desarrollo):

```bash
npm start
# Servidor corriendo en http://localhost:3000
```

## 🧪 Pruebas

```bash
npm test
```

## 📂 Estructura
- `src/models/` - Modelos Sequelize (User, Character)
- `src/controllers/` - Lógica de negocio/API
- `src/routes/` - Endpoints
- `src/middleware/` - Middlewares JWT y manejo de errores
- `tests/` - Pruebas unitarias con Jest

## 🗃️ Base de datos
SQLite lista para migrar a PostgreSQL. El archivo `database.sqlite` se crea automáticamente.

## 🚩 Notas
Todos los endpoints usan JSON y están documentados con comentarios.
Para endpoints protegidos, agrega el header:

```
Authorization: Bearer <token>
```

Sube archivos PDF/imágenes al crear o editar personajes (ver rutas).
Para producción, cambia el `JWT_SECRET` en `.env`.

## Funciones avanzadas
- `POST /api/characters/:id/duplicate` duplica un personaje existente.
- `GET /api/characters/:id/history` obtiene el historial de cambios.
- `POST /api/characters/export` exporta una lista de personajes a Excel (IDs en el body).
- `POST /api/characters/:id/test` prueba localmente la conversación con la IA.

