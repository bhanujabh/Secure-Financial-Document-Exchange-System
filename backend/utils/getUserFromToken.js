// utils/getUserFromToken.js
const jwt = require('jsonwebtoken');

module.exports = (req) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error('Token Error:', err.message);
    throw new Error('Invalid token');
  }
};
