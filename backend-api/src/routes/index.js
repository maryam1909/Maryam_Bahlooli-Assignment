const express = require('express');
const authRoutes = require('./auth.routes');
const taskRoutes = require('./task.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;


