import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });

      const token = res.data.token;
      const decoded = jwtDecode(token);

      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        alert('Token expired');
        return;
      }

      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      console.log(`Login failed: ${err}`);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
