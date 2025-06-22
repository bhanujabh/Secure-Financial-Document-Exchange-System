import LoginForm from '../components/LoginForm';

export default function LoginPage({ onLogin }) {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm onLogin={onLogin} />
    </div>
  );
}