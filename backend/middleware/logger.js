const fs = require('fs');
const path = require('path');

module.exports = (action) => {
  return (req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.user.username} (${req.user.role}) - ${action} - ${req.method} ${req.originalUrl}\n`;

    fs.appendFileSync(path.join(__dirname, '../logs/audit.log'), logEntry);
    next();
  };
};
