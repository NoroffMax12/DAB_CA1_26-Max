const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AnimalTemperament = sequelize.define('AnimalTemperament', {
  animalId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'animals',
      key: 'id'
    }
  },
  temperamentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'temperaments',
      key: 'id'
    }
  }
}, {
  tableName: 'animal_temperaments',
  timestamps: false
});

module.exports = AnimalTemperament;