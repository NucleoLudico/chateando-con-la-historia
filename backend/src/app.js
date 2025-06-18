/**
 * Punto de entrada para la aplicación Express.
 * - Configura middlewares de seguridad y parsing.
 * - Conecta con la base de datos SQLite.
 * - Monta rutas para usuarios y personajes.
 * - Maneja errores globales.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user.routes');
const characterRoutes = require('./routes/character.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middlewares globales
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Conexión a la base de datos
sequelize.sync().then(() => {
  console.log('Base de datos conectada y sincronizada.');
});

// Montaje de rutas
app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;

// Inicia servidor solo si es ejecutado directamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}
