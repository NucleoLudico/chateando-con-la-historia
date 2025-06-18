const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateJWT, authorizeRole } = require('../middleware/auth');

// Registro y login
router.post('/register', userController.register);
router.post('/login', userController.login);

// Recuperación y cambio de contraseña
router.post('/recover', userController.recoverPassword);
router.post('/change-password', authenticateJWT, userController.changePassword);

// Gestión de usuarios (admin/curador)
router.get('/', authenticateJWT, authorizeRole(['admin', 'curador']), userController.getAll);
router.get('/:id', authenticateJWT, userController.getById);
router.put('/:id', authenticateJWT, authorizeRole(['admin']), userController.update);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), userController.remove);

module.exports = router;
