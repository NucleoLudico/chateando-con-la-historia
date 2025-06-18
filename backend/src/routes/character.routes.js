const express = require('express');
const router = express.Router();
const characterController = require('../controllers/character.controller');
const { authenticateJWT, authorizeRole } = require('../middleware/auth');
const multer = require('multer');

// Configuración básica de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Crear personaje (curador o admin)
router.post('/', authenticateJWT, authorizeRole(['curador', 'admin']), upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), characterController.create);

// CRUD completo
router.get('/', characterController.getAll);
router.get('/:id', characterController.getById);
router.put('/:id', authenticateJWT, authorizeRole(['curador', 'admin']), upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), characterController.update);
router.delete('/:id', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.remove);

module.exports = router;
