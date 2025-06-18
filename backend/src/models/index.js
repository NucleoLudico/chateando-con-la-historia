const { Sequelize } = require('sequelize');

// Inicializa Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || 'database.sqlite',
  logging: false
});

module.exports = { sequelize };
