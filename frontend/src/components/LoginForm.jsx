import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/LoginForm.scss'; // Import the SCSS file

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, password });
      const user = response.data.user;

      // Store user in local storage and trigger state update
      localStorage.setItem('user', JSON.stringify(user));
      onLoginSuccess(user); // Notify App.js about login success

      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
      <div className="form-footer">
        <a href="/forgot-password">Forgot Password?</a> | <a href="/signup">Sign Up</a>
      </div>
    </form>
  );
}

export default LoginForm;






