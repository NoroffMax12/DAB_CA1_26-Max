const fs = require('fs').promises;
const path = require('path');
const { sequelize } = require('../models');

async function populateDatabase() {
  try {
    const [results] = await sequelize.query('SELECT COUNT(*) as count FROM users');
    if (results[0].count > 0) {
      return { success: false, message: 'Database already populated' };
    }

    const files = [
      'species.json',
      'sizes.json',
      'temperaments.json',
      'users.json',
      'animals.json',
      'animal_temp.json'
    ];

    for (const file of files) {
      const filePath = path.join(__dirname, '../public/json', file);
      const data = await fs.readFile(filePath, 'utf8');
      const queries = JSON.parse(data);
      
      for (const query of queries) {
        await sequelize.query(query);
      }
    }

    return { success: true, message: 'Database populated successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

module.exports = { populateDatabase };