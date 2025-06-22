const fs = require('fs');
const path = require('path');

exports.getAuditLogs = async (req, res) => {
  try {
    const logPath = path.join(__dirname, '../logs/audit.log');
    if (!fs.existsSync(logPath)) return res.status(404).json({ message: 'No logs found' });

    const logs = fs.readFileSync(logPath, 'utf8');
    res.setHeader('Content-Type', 'text/plain');
    res.send(logs);
  } catch (err) {
    console.error('Log read error:', err);
    res.status(500).json({ message: 'Failed to read logs' });
  }
};
