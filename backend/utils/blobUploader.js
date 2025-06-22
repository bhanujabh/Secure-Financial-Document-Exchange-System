// utils/blobUploader.js
const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('securefiles');

// Upload file to Blob Storage
exports.uploadFileToBlob = async (blobPath, fileBuffer, mimeType) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: { blobContentType: mimeType },
  });
  console.log(`Uploaded ${blobPath} to Azure Blob`);
}

// Download file from Blob Storage
exports.downloadFileFromBlob = async (blobPath) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
  const response = await blockBlobClient.download();
  return streamToBuffer(response.readableStreamBody);
};

// Stream helper
exports.streamToBuffer = (readableStream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => chunks.push(data instanceof Buffer ? data : Buffer.from(data)));
    readableStream.on('end', () => resolve(Buffer.concat(chunks)));
    readableStream.on('error', reject);
  });
};

exports.deleteBlobFile = async (blobPath) => {
  const blobClient = containerClient.getBlockBlobClient(blobPath);
  await blobClient.deleteIfExists();
};


