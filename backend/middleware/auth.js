// middleware/auth.js
const getUserFromToken = require('../utils/getUserFromToken');

module.exports = (roles = []) => {
  return (req, res, next) => {
    try {
      const user = getUserFromToken(req);
      req.user = user;

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient role' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized: ' + err.message });
    }
  };
};
