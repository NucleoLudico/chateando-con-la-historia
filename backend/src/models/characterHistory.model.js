const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const CharacterHistory = sequelize.define('CharacterHistory', {
codex/implementar-duplicado,-historial,-exportar-y-prueba-ia-en-ba
  characterId: { type: DataTypes.INTEGER, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false },
  field: { type: DataTypes.STRING, allowNull: false },
  oldValue: { type: DataTypes.TEXT },
  newValue: { type: DataTypes.TEXT },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'character_history',
  timestamps: false
});

module.exports = { CharacterHistory };

  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  field: DataTypes.STRING,
  oldValue: DataTypes.TEXT,
  newValue: DataTypes.TEXT,
  changedBy: DataTypes.INTEGER,
}, {
  timestamps: true,
  tableName: 'character_history',
});

module.exports = CharacterHistory;
 main
