const router = require('express').Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadFile, downloadFile, deleteFile, getFile, getAuditLogs } = require('../controllers/fileController');
const logAction = require('../middleware/logger');
const { getAuditLogs } = require('../controllers/logController');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/files/:id', auth(['user', 'admin', 'auditor']),logAction('VIEW FILE METADATA'), getFile);
router.post('/upload', auth(['user', 'admin']), upload.single('file'), logAction('UPLOAD FILE'), uploadFile);
router.get('/download/:id', auth(['user', 'admin', 'auditor']),logAction('DOWNLOAD FILE'), downloadFile);
router.delete('/files/:id', auth(['admin']), logAction('DELETE FILE'), deleteFile);
router.get('/audit-logs', auth(['admin', 'auditor']), logAction('VIEW AUDIT LOGS'), getAuditLogs);

module.exports = router;
