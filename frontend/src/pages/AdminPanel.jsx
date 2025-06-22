import { useEffect, useState } from 'react';
import API from '../api';

export default function AdminPanel({ user }) {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('user');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateRole = async (id) => {
    try {
      await API.patch(`/admin/users/${id}/role`, { role: selectedRole });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'admin') return <p>Access Denied</p>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Email</th>
            <th>Current Role</th>
            <th>New Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                  <option value="user">User</option>
                  <option value="auditor">Auditor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => updateRole(u.id)}>Update Role</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
