import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import LandingPage from './components/LandingPage'; // Import LandingPage
import NewListing from './components/NewListing';

import MessagesPage from './components/MessagesPage';  // Import MessagesPage
import api from './api/api';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
        <Route path="/" element={<LandingPage cars={carListings} />} />
        
        {/* My Listings route */}
        <Route path="/my-listings" element={<ProfilePage user={user} />} />
        
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
        <Route path="/create-listing" element={<NewListing />} />
        <Route path="/listing/:id" element={<ListingItemDetails cars={carListings} />} />  {/** Route to show individual car details */}

        {/* Messages Route */}
        <Route path="/messages" element={<MessagesPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;










