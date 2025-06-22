const crypto = require('crypto');

exports.encryptFile = (buffer) => {
  const key = crypto.randomBytes(32); // 256-bit key
  const iv = crypto.randomBytes(16);  // Initialization vector

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    encryptedBuffer: encrypted,
    key: key.toString('base64'),
    iv: iv.toString('base64'),
    tag: tag.toString('base64')
  };
};

exports.decryptFile = (encryptedBuffer, keyBase64, ivBase64, tagBase64) => {
  const key = Buffer.from(keyBase64, 'base64');
  const iv = Buffer.from(ivBase64, 'base64');
  const tag = Buffer.from(tagBase64, 'base64');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final()
  ]);
};
