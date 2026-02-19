const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Species = sequelize.define('Species', {
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
  tableName: 'species',
  timestamps: false
});

module.exports = Species;