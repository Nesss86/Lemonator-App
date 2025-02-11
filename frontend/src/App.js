import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import LandingPage from './components/LandingPage';
import NewListing from './components/NewListing';
import ListingItemDetails from './components/ListingItemDetails';
import MessagesPage from './components/MessagesPage';
import api from './api/api';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditListingForm from './components/ProfilePage/EditListingForm';
import AboutPage from './components/AboutPage';
import Favourites from './components/Favourites';
import LemonDriveAIModal from './components/Chatbot/LemonDriveAIModal';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [carListings, setCarListings] = useState([]);
  const [showModal, setShowModal] = useState(false); // For chatbot modal visibility

  // Fetch car listings on mount
  useEffect(() => {
    api.get('/car_listings')
      .then((response) => {
        setCarListings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching car listings:', error);
      });
  }, []);

  // Sync user state when localStorage changes (quick login or logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <NavigationBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LandingPage cars={carListings} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my-listings" element={<ProfilePage />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={setUser} />} />
        <Route path="/signup" element={<SignupForm onSignupSuccess={setUser} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-listing" element={<NewListing user={user} />} />
        <Route path="/listing/:id" element={<ListingItemDetails />} />
        <Route path="/edit-listing/:id" element={<EditListingForm />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>

      {/* Conditionally render LemonDriveAI modal */}
      <LemonDriveAIModal showModal={showModal} setShowModal={setShowModal} />
    </Router>
  );
}

export default App;




























