/**
 * Controlador de personajes históricos/científicos.
 * Incluye manejo de prompt alma, biografía, fuentes, PDF e imagen.
 */

const Character = require('../models/character.model');
const CharacterHistory = require('../models/characterHistory.model');
const ExcelJS = require('exceljs');

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
    await CharacterHistory.create({
      characterId: character.id,
      action: 'create',
      changedBy: createdBy
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
    const character = await Character.findByPk(req.params.id);
    await Character.update(updates, { where: { id: req.params.id } });
    const changedBy = req.user.id;
    for (const [field, value] of Object.entries(updates)) {
      await CharacterHistory.create({
        characterId: req.params.id,
        action: 'update',
        field,
        oldValue: character[field],
        newValue: value,
        changedBy
      });
    }
    res.json({ message: 'Personaje actualizado' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Character.destroy({ where: { id: req.params.id } });
    await CharacterHistory.create({
      characterId: req.params.id,
      action: 'delete',
      changedBy: req.user.id
    });
    res.json({ message: 'Personaje eliminado' });
  } catch (err) {
    next(err);
  }
};

exports.duplicate = async (req, res, next) => {
  try {
    const orig = await Character.findByPk(req.params.id);
    if (!orig) return res.status(404).json({ error: 'No encontrado' });
    const copy = await Character.create({
      name: orig.name + ' (Copia)',
      promptAlma: orig.promptAlma,
      biography: orig.biography,
      sources: orig.sources,
      pdfPath: orig.pdfPath,
      imagePath: orig.imagePath,
      createdBy: req.user.id
    });
    await CharacterHistory.create({
      characterId: copy.id,
      action: 'duplicate',
      changedBy: req.user.id
    });
    res.status(201).json(copy);
  } catch (err) {
    next(err);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const history = await CharacterHistory.findAll({
      where: { characterId: req.params.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(history);
  } catch (err) {
    next(err);
  }
};

exports.exportExcel = async (req, res, next) => {
  try {
    const ids = req.body.ids || [];
    const characters = await Character.findAll({ where: ids.length ? { id: ids } : undefined });
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Personajes');
    ws.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Biografía', key: 'biography', width: 30 }
    ];
    characters.forEach(c => ws.addRow({ id: c.id, name: c.name, biography: c.biography }));
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=personajes.xlsx');
    await wb.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
};

exports.testChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    // Respuesta simulada
    res.json({ reply: `Respuesta de IA a "${message}"` });
  } catch (err) {
    next(err);
  }
};
