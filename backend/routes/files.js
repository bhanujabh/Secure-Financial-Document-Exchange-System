const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/auth');
const { uploadFile, downloadFile } = require('../controllers/fileController');

router.post('/upload', auth(['user', 'admin']), upload.single('file'), uploadFile);
router.get('/download/:filename', auth(['user', 'admin', 'auditor']), downloadFile);

module.exports = router;
