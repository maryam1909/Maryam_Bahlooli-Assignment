const { Task } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
client.on('error', (err) => console.error('Redis error', err));
client.connect().catch(() => {});

exports.createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, userId: req.user.id });
  await client.del(`user:${req.user.id}:tasks`);
  res.status(201).json(task);
});

exports.getUserTasks = asyncHandler(async (req, res) => {
  const cacheKey = `user:${req.user.id}:tasks`;
  const cached = await client.get(cacheKey);
  if (cached) {
    return res.status(200).json(JSON.parse(cached));
  }
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  await client.set(cacheKey, JSON.stringify(tasks), { EX: 60 });
  res.status(200).json(tasks);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const task = await Task.findOne({ where: { id, userId: req.user.id } });

  if (!task) {
    return res.status(404).json({ message: 'Task not found or you are not authorized' });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;

  await task.save();
  await client.del(`user:${req.user.id}:tasks`);
  res.status(200).json(task);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id, userId: req.user.id } });

  if (!task) {
    return res.status(404).json({ message: 'Task not found or you are not authorized' });
  }

  await task.destroy();
  await client.del(`user:${req.user.id}:tasks`);
  res.status(204).send();
});

exports.getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findAll();
  res.status(200).json(tasks);
});


