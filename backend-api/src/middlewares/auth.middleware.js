const jwt = require('jsonwebtoken');
const { User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findByPk(decoded.id, {
    attributes: { exclude: ['password'] }
  });

  if (!req.user) {
    return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
  }

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  };
};


