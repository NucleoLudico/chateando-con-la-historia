/**
 * Modelo de Personaje: incluye prompt alma, biografía, fuentes y archivos (PDF, imagen).
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Character = sequelize.define('Character', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  promptAlma: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Prompt alma del personaje para la IA.'
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  sources: {
    type: DataTypes.JSON,
    allowNull: true
  },
  pdfPath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'ID usuario curador'
  }
}, {
  timestamps: true,
  tableName: 'characters'
});

module.exports = Character;
