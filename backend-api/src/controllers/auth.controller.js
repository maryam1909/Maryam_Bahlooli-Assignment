const { User } = require('../models');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const newUser = await User.create({ username, email, password, role });
  res.status(201).json({ message: 'User registered successfully!', userId: newUser.id });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.isValidPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user.id, user.role);
  res.status(200).json({
    status: 'success',
    token,
    user: { id: user.id, username: user.username, role: user.role },
  });
});


