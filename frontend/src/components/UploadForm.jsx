import React, { useState } from 'react';
import API from '../api';

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [progress, setProgress] = useState(0);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', file);
    if (filename) formData.append('filename', filename);

    try {
      await API.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      setFile(null);
      setFilename('');
      setProgress(0);
      alert('File uploaded successfully!');
      if (onUpload) onUpload();
    } catch (err) {
      alert('File upload failed.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Rename file (optional)"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
      />
      {progress > 0 && <progress value={progress} max="100">{progress}%</progress>}
      <button type="submit">Upload</button>
    </form>
  );
}