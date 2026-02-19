const { sequelize } = require('../models');

async function syncDb() {
  try {
    await sequelize.sync({ force: true });
    console.log('✓ All tables created successfully');
  } catch (error) {
    console.error('✗ Error creating tables:', error);
  } finally {
    await sequelize.close();
  }
}

syncDb();
