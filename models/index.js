const sequelize = require('../config/database');
const User = require('./User');
const Species = require('./Species');
const Size = require('./Size');
const Temperament = require('./temperament');
const Animal = require('./Animal');
const AnimalTemperament = require('./AnimalTemperament');
const Adoption = require('./adoption');

// Relasjoner
Animal.belongsTo(Species, { foreignKey: 'speciesId' });
Animal.belongsTo(Size, { foreignKey: 'sizeId' });

Animal.belongsToMany(Temperament, { through: AnimalTemperament, foreignKey: 'animalId' });
Temperament.belongsToMany(Animal, { through: AnimalTemperament, foreignKey: 'temperamentId' });

Adoption.belongsTo(Animal, { foreignKey: 'animalId' });
Adoption.belongsTo(User, { foreignKey: 'userId' });
Animal.hasOne(Adoption, { foreignKey: 'animalId' });
User.hasMany(Adoption, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Species,
  Size,
  Temperament,
  Animal,
  AnimalTemperament,
  Adoption
};