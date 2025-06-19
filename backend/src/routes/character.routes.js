const express = require('express');
const router = express.Router();
const characterController = require('../controllers/character.controller');
const { authenticateJWT, authorizeRole } = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/', authenticateJWT, authorizeRole(['curador', 'admin']), upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), characterController.create);

router.get('/', characterController.getAll);
router.get('/:id', characterController.getById);
router.put('/:id', authenticateJWT, authorizeRole(['curador', 'admin']), upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), characterController.update);
router.delete('/:id', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.remove);

router.post('/:id/duplicate', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.duplicate);
router.get('/:id/history', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.getHistory);
router.post('/export', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.exportExcel);
router.post('/:id/test', authenticateJWT, authorizeRole(['curador', 'admin']), characterController.testChat);

module.exports = router;
