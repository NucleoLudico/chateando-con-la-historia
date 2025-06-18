/**
 * Controlador de personajes históricos/científicos.
 * Incluye manejo de prompt alma, biografía, fuentes, PDF e imagen.
 */

const Character = require('../models/character.model');

exports.create = async (req, res, next) => {
  try {
    const { name, promptAlma, biography, sources } = req.body;
    const pdfPath = req.files?.pdf?.[0]?.path || null;
    const imagePath = req.files?.image?.[0]?.path || null;
    const createdBy = req.user.id;

    const character = await Character.create({
      name,
      promptAlma,
      biography,
      sources: sources ? JSON.parse(sources) : [],
      pdfPath,
      imagePath,
      createdBy
    });
    res.status(201).json({ message: 'Personaje creado', character });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const character = await Character.findByPk(req.params.id);
    if (!character) return res.status(404).json({ error: 'No encontrado' });
    res.json(character);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { name, promptAlma, biography, sources } = req.body;
    const updates = { name, promptAlma, biography };
    if (sources) updates.sources = JSON.parse(sources);
    if (req.files?.pdf) updates.pdfPath = req.files.pdf[0].path;
    if (req.files?.image) updates.imagePath = req.files.image[0].path;
    await Character.update(updates, { where: { id: req.params.id } });
    res.json({ message: 'Personaje actualizado' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Character.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Personaje eliminado' });
  } catch (err) {
    next(err);
  }
};
