const { v4: uuidv4 } = require('uuid');
const { Document } = require('../models/Document');
const { getUserFromToken } = require('../middleware/auth');
const { uploadFileToBlob, downloadFileFromBlob } = require('../utils/blobUploader');

// Upload file
exports.uploadFile = async (req, res) => {
  try {
    const user = getUserFromToken(req);
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const blobPath = `${user.id}/${uuidv4()}-${file.originalname}`;
    await uploadFileToBlob(blobPath, file.buffer, file.mimetype);

    const doc = await Document.create({
      userId: user.id,
      filename: file.originalname,
      blobPath,
      uploadedBy: user.username,
    });

    res.status(201).json({ message: 'File uploaded successfully', document: doc });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Upload failed' });
  }
};

// Download file
exports.downloadFile = async (req, res) => {
  try {
    const user = getUserFromToken(req);
    const doc = await Document.findByPk(req.params.id);

    if (!doc) return res.status(404).json({ message: 'File not found' });

    if (doc.userId !== user.id && user.role !== 'admin' && user.role !== 'auditor') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const buffer = await downloadFileFromBlob(doc.blobPath);
    res.setHeader('Content-Disposition', `attachment; filename="${doc.filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(buffer);
  } catch (err) {
    console.error('Download Error:', err);
    res.status(500).json({ message: 'Download failed' });
  }
};
