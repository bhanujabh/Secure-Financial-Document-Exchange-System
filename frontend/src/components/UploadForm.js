import React, { useState } from 'react';
import API from '../api';

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await API.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFile(null);
      alert('File uploaded successfully!');
      if (onUpload) onUpload(); // Refresh file list
    } catch (err) {
      alert('File upload failed.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
}
