import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import UserInfo from './UserInfo';
import CarListings from './CarListings';
import { useNavigate } from 'react-router-dom';
import '../../styles/ProfilePage.scss';

function ProfilePage() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // To navigate dynamically when quick login occurs

  // Function to fetch the user's profile
  const fetchProfile = async (storedUser) => {
    try {
      if (!storedUser) {
        setError('No user found in local storage. Please log in.');
        return;
      }

      const response = await api.get(`/profile/${storedUser.id}`);
      console.log('Profile Response:', response.data);
      setUser(response.data.user);
      setListings(response.data.listings);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Detect changes in logged-in user and re-fetch the profile
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    fetchProfile(storedUser);

    // Listen for quick login events using storage events
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser && updatedUser.id !== user?.id) {
        fetchProfile(updatedUser);
        navigate('/profile');  // Ensure proper navigation if needed
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, navigate]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>Error loading profile. Please try again later.</div>;

  return (
    <div className="profile-page">
      <h1>Welcome to Your Profile, {user.first_name} {user.last_name}</h1>
      <UserInfo user={user} />

      <h2>Your Listings</h2>
      {listings.length > 0 ? (
        <CarListings listings={listings} />
      ) : (
        <p>You have no active listings. Create one <a href="/create-listing">here</a>.</p>
      )}
    </div>
  );
}

export default ProfilePage;












