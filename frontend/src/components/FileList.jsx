import React from 'react';

export default function FileList({ files, onDelete, user }) {
  if (!files || files.length === 0) return <p>No files uploaded yet.</p>;

  return (
    <div>
      <h3>Uploaded Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.name}
            </a>
            <span> ({file.type}, {Math.round(file.size / 1024)} KB)</span>
            <br />
            <small>Uploaded on: {new Date(file.createdAt).toLocaleString()}</small>

            {file.type.startsWith('image/') && (
              <div><img src={file.url} alt={file.name} width="100" /></div>
            )}

            {file.type === 'application/pdf' && (
              <embed src={file.url} width="100%" height="200px" />
            )}

            {user?.role === 'admin' && (
              <button onClick={() => onDelete(file.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}