const sequelize = require('../config/database');
const User = require('./user.model');
const Task = require('./task.model');

User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  User,
  Task,
};

module.exports = db;


