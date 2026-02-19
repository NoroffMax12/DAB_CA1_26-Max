const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Animal = sequelize.define('Animal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  speciesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'species',
      key: 'id'
    }
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  sizeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sizes',
      key: 'id'
    }
  }
}, {
  tableName: 'animals',
  timestamps: false
});

module.exports = Animal;