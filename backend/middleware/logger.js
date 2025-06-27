const fs = require('fs');
const path = require('path');
const { auditActionCounter } = require('../metrics');

const logDir = path.join(__dirname, '../logs');
const logFile = path.join(logDir, 'audit.log');

module.exports = (action) => {
  return (req, res, next) => {
    const username = req.user?.username || 'unknown';
    const role = req.user?.role || 'unknown';
    const logEntry = `${new Date().toISOString()} - ${username} (${role}) - ${action} - ${req.method} ${req.originalUrl}\n`;

    try {
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      fs.appendFileSync(logFile, logEntry);
    } catch (err) {
      console.error('Failed to write audit log:', err.message);
    }

    try {
      auditActionCounter.inc({
        user: username,
        action: action,
      });
    } catch (err) {
      console.error('Failed to record audit metric:', err.message);
    }

    next();
  };
};
