import { useState, useEffect } from 'react';
import API from '../api';
import FileList from '../components/FileList';
import UploadForm from '../components/UploadForm';

export default function Dashboard({ user }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await API.get('/files');
      setFiles(res.data);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  if (!user) return <p>Please login.</p>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      {user.role === 'admin' && <a href="/admin">Go to Admin Panel</a>}

      {/* File Upload Component */}
      <UploadForm onUpload={fetchFiles} />

      {/* File List */}
      <FileList files={files} />
    </div>
  );
}
