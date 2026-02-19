const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Temperament = sequelize.define('Temperament', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'temperaments',
  timestamps: false
});

module.exports = Temperament;