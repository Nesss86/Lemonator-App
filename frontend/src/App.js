import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProfilePage from './components/ProfilePage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <Router>
      <NavigationBar user={user} />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route
          path="/login"
          element={
            <LoginForm onLoginSuccess={(user) => {
              setUser(user);
              window.location.href = '/profile'; // Redirect after login
            }} />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupForm onSignupSuccess={(user) => {
              setUser(user);
              window.location.href = '/profile'; // Redirect after signup
            }} />
          }
        />
        <Route path="/profile" element={<ProfilePage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;





