// utils/getUserFromToken.js
const jwt = require('jsonwebtoken');

module.exports = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET);
};
