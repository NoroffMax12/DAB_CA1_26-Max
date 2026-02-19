const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('adoptiondb', 'dabcaowner', 'dabca1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;