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

codex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba
router.post('/:id/duplicate', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.duplicate);
router.get('/:id/history', authenticateJWT, authorizeRole(['curador', 'admin']), async (req, res, next) => {
  try {
    const { CharacterHistory } = require('../models/characterHistory.model');
    const history = await CharacterHistory.findAll({ where: { characterId: req.params.id }, order: [['date', 'DESC']] });
    res.json(history);
  } catch (err) {
    next(err);
  }
});
router.post('/export', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.exportExcel);
router.post('/:id/test', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.testCharacterChat);

// Extra functionalities
router.post('/:id/duplicate', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.duplicate);
router.get('/:id/history', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.getHistory);
router.post('/export', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.exportExcel);
router.post('/:id/test', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.testChat);
main

module.exports = router;
