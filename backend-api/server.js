require('dotenv').config();
const app = require('./app');
const db = require('./src/models');

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await db.sequelize.sync();
    console.log('Database connected and synced.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();


