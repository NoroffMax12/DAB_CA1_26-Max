const sequelize = require('./database');

sequelize.authenticate()
  .then(() => console.log('✓ Database connected'))
  .catch(err => console.error('✗ Connection failed:', err));