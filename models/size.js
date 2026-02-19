const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Size = sequelize.define('Size', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'sizes',
  timestamps: false
});

module.exports = Size;