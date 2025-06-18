/**
 * Middleware de manejo global de errores.
 */

exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
};
