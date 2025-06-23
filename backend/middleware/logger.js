const fs = require('fs');
const path = require('path');
const { auditActionCounter } = require('../metrics');

module.exports = (action) => {
  return (req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.user.username} (${req.user.role}) - ${action} - ${req.method} ${req.originalUrl}\n`;

    fs.appendFileSync(path.join(__dirname, '../logs/audit.log'), logEntry);
    auditActionCounter.inc({ user: user.username, action: actionType });
    next();
  };
};
