const fs = require('fs');
const path = require('path');
const { auditActionCounter } = require('../metrics');

const logDir = path.join(__dirname, '../logs');
const logFile = path.join(logDir, 'audit.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

module.exports = (action) => {
  return (req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.user.username} (${req.user.role}) - ${action} - ${req.method} ${req.originalUrl}\n`;

    try {
      fs.appendFileSync(logFile, logEntry);
    } catch (err) {
      console.error('Audit log write failed:', err.message);
    }

    auditActionCounter.inc({
      user: req.user?.username || 'unknown',
      action: action,
    });


    next();
  };
};

