import { useState, useEffect } from 'react';
import API from '../api';
import FileList from '../components/FileList';
import UploadForm from '../components/UploadForm';

export default function Dashboard({ user }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/files?page=${page}&limit=10`);
      setFiles(res.data.files);
    } catch (err) {
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await API.delete(`/files/${id}`);
      fetchFiles();
    } catch (err) {
      console.error('Failed to delete file:', err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [page]);

  if (!user) return <p>Please login.</p>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      {user.role === 'admin' && <a href="/admin">Go to Admin Panel</a>}

      {['admin', 'user'].includes(user.role) && (
        <UploadForm onUpload={fetchFiles} />
      )}

      {loading ? <p>Loading files...</p> : (
        <FileList files={files} onDelete={handleDelete} user={user} />
      )}

      <div>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
