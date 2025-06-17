import React from 'react';

export default function FileList({ files }) {
  if (!files || files.length === 0) {
    return <p>No files uploaded yet.</p>;
  }

  return (
    <div>
      <h3>Uploaded Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
