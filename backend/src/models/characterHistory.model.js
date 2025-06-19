const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const CharacterHistory = sequelize.define('CharacterHistory', {
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
