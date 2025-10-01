const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const {
  registerValidationRules,
  loginValidationRules,
  handleValidationErrors,
} = require('../middlewares/validator.middleware');

const router = express.Router();

router.post('/register', registerValidationRules(), handleValidationErrors, register);
router.post('/login', loginValidationRules(), handleValidationErrors, login);

module.exports = router;


