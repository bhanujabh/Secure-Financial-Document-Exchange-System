// utils/blobUploader.js
const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('secure-files');

// Upload file to Blob Storage
async function uploadFileToBlob(blobPath, fileBuffer, mimeType) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: { blobContentType: mimeType },
  });
  console.log(`Uploaded ${blobPath} to Azure Blob`);
}

// Download file from Blob Storage
async function downloadFileFromBlob(blobPath) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
  const response = await blockBlobClient.download();
  return streamToBuffer(response.readableStreamBody);
}

// Stream helper
function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => chunks.push(data instanceof Buffer ? data : Buffer.from(data)));
    readableStream.on('end', () => resolve(Buffer.concat(chunks)));
    readableStream.on('error', reject);
  });
}

module.exports = {
  uploadFileToBlob,
  downloadFileFromBlob
};
