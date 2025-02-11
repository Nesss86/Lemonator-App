import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { UserProvider } from './context/UserContext'; // Import the UserContext

// Custom hook to handle route changes
function useRouteChangeHandler(fetchAllListings) {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      fetchAllListings();
    }
  }, [location.pathname, fetchAllListings]);
}

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [carListings, setCarListings] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for the chatbot modal visibility

  // Function to fetch all car listings
  const fetchAllListings = useCallback(() => {
    api.get('/car_listings')
      .then(response => {
        setCarListings(response.data);
      })
      .catch(error => {
        console.error('Error fetching car listings:', error);
      });
  }, []);  // Empty dependency array ensures it's defined once

  // Load user and fetch listings when app mounts
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    fetchAllListings(); // Fetch all listings on initial load
  }, [fetchAllListings]);

  // Use the custom hook
  useRouteChangeHandler(fetchAllListings);

  return (
    <UserProvider> {/* Wrap the app with the UserProvider */}
      <NavigationBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LandingPage cars={carListings} setCarListings={setCarListings} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my-listings" element={<ProfilePage user={user} setUser={setUser} listings={carListings} setCarListings={setCarListings} />} key={user ? user.id : 'default'} />
        <Route path="/login" element={<LoginForm onLoginSuccess={setUser} />} />
        <Route path="/signup" element={<SignupForm onSignupSuccess={setUser} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-listing" element={<NewListing setCars={setCarListings} user={user} />} />
        <Route path="/listing/:id" element={<ListingItemDetails cars={carListings} />} />
        <Route path="/edit-listing/:id" element={<EditListingForm cars={carListings} user={user} />} />
        <Route path="/messages" element={<MessagesPage user={user} />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>

      {/* Conditionally render LemonDriveAI modal */}
      <LemonDriveAIModal showModal={showModal} setShowModal={setShowModal} />
    </UserProvider>
  );
}

export default App;






























