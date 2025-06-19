const Character = require('../models/character.model');
const { CharacterHistory } = require('../models/characterHistory.model');
const ExcelJS = require('exceljs');
const { askLlama } = require('../services/llama');

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
      field: 'all',
      oldValue: '',
      newValue: JSON.stringify(character.toJSON()),
      userId: createdBy,
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

    const old = await Character.findByPk(req.params.id);
    await Character.update(updates, { where: { id: req.params.id } });

    for (const field of Object.keys(updates)) {
      if (old[field] !== updates[field]) {
        await CharacterHistory.create({
          characterId: old.id,
          action: 'update',
          field,
          oldValue: old[field],
          newValue: updates[field],
          userId: req.user.id
        });
      }
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
    if (old) {
      await CharacterHistory.create({
        characterId: old.id,
        action: 'delete',
        field: 'all',
        oldValue: JSON.stringify(old.toJSON()),
        newValue: '',
        userId: req.user.id
      });
    }
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
      field: 'all',
      oldValue: '',
      newValue: `Duplicado desde personaje ${orig.id}`,
      userId: req.user.id
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
      order: [['date', 'DESC']]
    });
    res.json(history);
  } catch (err) {
    next(err);
  }
};

exports.exportExcel = async (req, res, next) => {
  try {
    const ids = req.body.ids || [];
    const personajes = await Character.findAll({ where: ids.length ? { id: ids } : undefined });

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
    res.end();
  } catch (err) {
    next(err);
  }
};

exports.testCharacterChat = async (req, res, next) => {
  try {
    const character = await Character.findByPk(req.params.id);
    if (!character) return res.status(404).json({ error: 'Personaje no encontrado' });
    const { prompt } = req.body;
    const fullPrompt = `${character.promptAlma}\n\nPregunta del usuario: ${prompt}`;
    const respuesta = await askLlama(fullPrompt, character.sources);
    res.json({ reply: respuesta });
  } catch (err) {
    next(err);
  }
};

exports.testChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    res.json({ reply: `Respuesta de IA a "${message}"` });
  } catch (err) {
    next(err);
  }
};
