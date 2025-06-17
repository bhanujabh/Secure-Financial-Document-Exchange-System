import { useState, useEffect } from 'react';
import API from '../api';

export default function Dashboard({ user }) {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await API.get('/files');
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      await API.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchFiles();
      setFile(null);
      alert('File uploaded');
    } catch (err) {
        console.log('Upload failed: ', err);
      alert('Upload failed');
    }
  };

  if (!user) return <p>Please login.</p>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      {user.role === 'admin' && <a href="/admin">Go to Admin Panel</a>}
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      <h3>Your Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}><a href={file.url} target="_blank" rel="noreferrer">{file.name}</a></li>
        ))}
      </ul>
    </div>
  );
}
