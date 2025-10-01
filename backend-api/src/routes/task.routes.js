const express = require('express');
const {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
  getAllTasks,
} = require('../controllers/task.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createTask).get(getUserTasks);
router.route('/:id').patch(updateTask).delete(deleteTask);

router.route('/all').get(restrictTo('admin'), getAllTasks);

module.exports = router;


