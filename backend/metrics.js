const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const uploadCounter = new client.Counter({
  name: 'upload_requests_total',
  help: 'Total file upload attempts',
  labelNames: ['user'],
});
register.registerMetric(uploadCounter);

const downloadCounter = new client.Counter({
  name: 'downloads_total',
  help: 'Number of successful file downloads',
  labelNames: ['user', 'filename'],
});
register.registerMetric(downloadCounter);

const failedLoginCounter = new client.Counter({
  name: 'failed_login_attempts_total',
  help: 'Number of failed login attempts',
  labelNames: ['username'],
});
register.registerMetric(failedLoginCounter);

const auditActionCounter = new client.Counter({
  name: 'audit_actions_total',
  help: 'Audit trail actions grouped by type and user',
  labelNames: ['user', 'action'],
});
register.registerMetric(auditActionCounter);


module.exports = {
  register,
  uploadCounter,
  failedLoginCounter,
  downloadCounter,
  auditActionCounter
};
