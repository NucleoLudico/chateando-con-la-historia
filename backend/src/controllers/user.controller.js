/**
 * Controlador de usuarios: registra, autentica y gestiona usuarios y contraseñas.
 */

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendRecoveryEmail } = require('../utils/email');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, role });
    res.status(201).json({ message: 'Usuario registrado', user: { id: user.id, username, email, role } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    next(err);
  }
};

exports.recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    await sendRecoveryEmail(email, 'Recupera tu contraseña aquí: <enlace>');
    res.json({ message: 'Instrucciones enviadas por email' });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.id;
    const hash = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hash }, { where: { id: userId } });
    res.json({ message: 'Contraseña actualizada' });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role', 'active', 'createdAt'] });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ['id', 'username', 'email', 'role', 'active', 'createdAt'] });
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { username, email, role, active } = req.body;
    await User.update({ username, email, role, active }, { where: { id: req.params.id } });
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    next(err);
  }
};
