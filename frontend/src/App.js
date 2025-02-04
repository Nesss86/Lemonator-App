import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

import ProfilePage from './components/ProfilePage/ProfilePage';
import LandingPage from './components/LandingPage'; // Import the LandingPage component
import ListingList from './components/ListingList';
import api from './api/api';
// import mockCarList from './mocks/mockCarList';
//import mockCarData from "./mocks/mockCarData";

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [carListings, setCarListings] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    api.get('/car_listings')
      .then(response => {
        setCarListings(response.data);
      })
      .catch(error => {
        console.error('Error fetching car listings:', error);
      });
  }, []);

  return (
    <Router>
      <NavigationBar user={user} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
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

      <SearchBar />
   <ul>
    <ListingList cars={carListings} />
   </ul>

    </Router>
  );
}

export default App;






