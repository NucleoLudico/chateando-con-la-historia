/**
 * Controlador de personajes históricos/científicos.
 * Incluye manejo de prompt alma, biografía, fuentes, PDF e imagen.
 */

const Character = require('../models/character.model');
codex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba
const { CharacterHistory } = require('../models/characterHistory.model');
const ExcelJS = require('exceljs');
const { askLlama } = require('../services/llama');

const CharacterHistory = require('../models/characterHistory.model');
const ExcelJS = require('exceljs');
main

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
codex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba
      action: 'Creado',
      field: 'todos',
      oldValue: '',
      newValue: JSON.stringify(character.toJSON()),
      userId: req.user.id

      action: 'create',
      changedBy: createdBy
main
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
codex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba
    const old = await Character.findByPk(req.params.id);
    await Character.update(updates, { where: { id: req.params.id } });
    for (const field of Object.keys(updates)) {
      if (old[field] !== updates[field]) {
        await CharacterHistory.create({
          characterId: old.id,
          action: 'Modificado',
          field,
          oldValue: old[field],
          newValue: updates[field],
          userId: req.user.id
        });
      }

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
main
    }
    res.json({ message: 'Personaje actualizado' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const old = await Character.findByPk(req.params.id);
    await Character.destroy({ where: { id: req.params.id } });
codex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba
    if (old) {
      await CharacterHistory.create({
        characterId: old.id,
        action: 'Eliminado',
        field: 'todos',
        oldValue: JSON.stringify(old.toJSON()),
        newValue: '',
        userId: req.user.id
      });
    }

    await CharacterHistory.create({
      characterId: req.params.id,
      action: 'delete',
      changedBy: req.user.id
    });
main
    res.json({ message: 'Personaje eliminado' });
  } catch (err) {
    next(err);
  }
};

exports.duplicate = async (req, res, next) => {
  try {
    const orig = await Character.findByPk(req.params.id);
    if (!orig) return res.status(404).json({ error: 'No encontrado' });
odex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba

    const duplicated = await Character.create({
      name: `${orig.name} (Copia)`,

    const copy = await Character.create({
      name: orig.name + ' (Copia)',
 main
      promptAlma: orig.promptAlma,
      biography: orig.biography,
      sources: orig.sources,
      pdfPath: orig.pdfPath,
      imagePath: orig.imagePath,
      createdBy: req.user.id
    });
codex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba

    await CharacterHistory.create({
      characterId: duplicated.id,
      action: 'Duplicado',
      field: 'todos',
      oldValue: '',
      newValue: `Duplicado desde personaje ${orig.id}`,
      userId: req.user.id
    });

    res.status(201).json(duplicated);

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
 main
  } catch (err) {
    next(err);
  }
};

exports.exportExcel = async (req, res, next) => {
  try {
    const ids = req.body.ids || [];
codex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba
    const personajes = await Character.findAll({ where: { id: ids } });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Personajes');
    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 32 },
      { header: 'Prompt Alma', key: 'promptAlma', width: 40 },
      { header: 'Biografía', key: 'biography', width: 50 },
      { header: 'Fuentes', key: 'sources', width: 50 }
    ];
    personajes.forEach(p => {
      sheet.addRow({
        id: p.id,
        name: p.name,
        promptAlma: p.promptAlma,
        biography: p.biography,
        sources: Array.isArray(p.sources) ? p.sources.join('; ') : p.sources
      });
    });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=personajes.xlsx');
    await workbook.xlsx.write(res);

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
main
    res.end();
  } catch (err) {
    next(err);
  }
};

  codex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba
exports.testCharacterChat = async (req, res, next) => {
  try {
    const character = await Character.findByPk(req.params.id);
    if (!character) return res.status(404).json({ error: 'Personaje no encontrado' });
    const { prompt } = req.body;
    const fullPrompt = `${character.promptAlma}\n\nPregunta del usuario: ${prompt}`;
    const respuesta = await askLlama(fullPrompt, character.sources);
    res.json({ reply: respuesta });

exports.testChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    // Respuesta simulada
    res.json({ reply: `Respuesta de IA a "${message}"` });
 main
  } catch (err) {
    next(err);
  }
};
