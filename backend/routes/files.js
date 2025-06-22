const router = require('express').Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadFile, downloadFile, deleteFile, getFile, getAuditLogs } = require('../controllers/fileController');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/files/:id', auth(['user', 'admin', 'auditor']), getFile);
router.post('/upload', auth(['user', 'admin']), upload.single('file'), uploadFile);
router.get('/download/:id', auth(['user', 'admin', 'auditor']), downloadFile);
router.delete('/files/:id', auth(['admin']), deleteFile);
router.get('/audit-logs', auth(['admin', 'auditor']), getAuditLogs);

module.exports = router;
