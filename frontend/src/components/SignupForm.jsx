import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/LoginForm.scss';

function SignupForm({ onSignupSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/signup', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      const user = response.data.user;

      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(user));

      // Notify parent component (App.js)
      onSignupSuccess(user);

      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSignup} className="login-form">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
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
      <button type="submit">Sign Up</button>
      <div className="form-footer">
        <a href="/login">Already have an account? Log In</a>
      </div>
    </form>
  );
}

export default SignupForm;