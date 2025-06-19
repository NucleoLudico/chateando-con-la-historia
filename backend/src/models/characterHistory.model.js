const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const CharacterHistory = sequelize.define('CharacterHistory', {
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
