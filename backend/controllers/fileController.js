const { v4: uuidv4 } = require('uuid');
const { Document } = require('../models/Document');
const getUserFromToken = require('../utils/getUserFromToken');
const { uploadFileToBlob, downloadFileFromBlob } = require('../utils/blobUploader');
const { encryptFile, decryptFile } = require('../utils/encryption');
const { saveEncryptionKey, getEncryptionKey } = require('../utils/keyVault');

// Upload file
exports.uploadFile = async (req, res) => {
  try {
    const user = getUserFromToken(req);
    console.log("Decoded user from token:", user);
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const { encryptedBuffer, key, iv, tag } = encryptFile(file.buffer);

    const blobPath = `${user.username}/${uuidv4()}-${file.originalname}`;
    await uploadFileToBlob(blobPath, encryptedBuffer, file.mimetype);

    // Store encryption info in Key Vault
    const secretName = `enc-key-${blobPath.replace(/\//g, '-')}`;
    const keyPackage = JSON.stringify({ key, iv, tag });
    await saveEncryptionKey(secretName, keyPackage);

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

    const encryptedBuffer = await downloadFileFromBlob(doc.blobPath);

    const secretName = `enc-key-${doc.blobPath.replace(/\//g, '-')}`;
    const keyData = JSON.parse(await getEncryptionKey(secretName));

    const decryptedBuffer = decryptFile(
      encryptedBuffer,
      keyData.key,
      keyData.iv,
      keyData.tag
    );

    res.setHeader('Content-Disposition', `attachment; filename="${doc.filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(decryptedBuffer);
  } catch (err) {
    console.error('Download Error:', err);
    res.status(500).json({ message: 'Download failed' });
  }
};

exports.deleteFile = async(req, res) => {
  try{
    const user = getUserFromToken(req);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admin can delete files.' });
    }

    const doc = await Document.findByPk(req,params.id);
    if (!doc) return res.status(404).json({ message: 'File not found' });

    await deleteBlobFile(doc.blobPath);

    await doc.destroy();
    res.status(200).json({ message: 'File deleted successfully.' });
  } catch (err){
    console.error('Delete Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getFile = async (req, res) => {
  const user = req.user;
  const doc = await Document.findByPk(req.params.id);

  if (!doc) return res.status(404).json({ message: 'File not found' });

  if (user.role === 'user' && doc.userId !== user.id) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  res.json(doc);
};

