import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '../../context/UserContext'; // Importing context
import api from '../../api/api';
import UserInfo from './UserInfo';
import CarListings from './CarListings';
import '../../styles/ProfilePage.scss';

function ProfilePage() {
  const { user } = useUser(); // Access user context
  const [listings, setListings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the user's profile
  const fetchProfile = useCallback(async (userToFetch) => {
    if (!userToFetch) {
      setError('No user found in local storage. Please log in.');
      return;
    }

    try {
      const response = await api.get(`/profile/${userToFetch.id}`);
      setListings(response.data.listings);
      setReviews(response.data.reviews);
      setError(null);  // Clear any previous errors
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch profile whenever the user changes (quick login or normal login)
  useEffect(() => {
    if (user) {
      fetchProfile(user); // Fetch profile when user is set/changed
    }
  }, [user, fetchProfile]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>Error loading profile. Please try again later.</div>;

  return (
    <div className="profile-page">
      <h1>Welcome to Your Profile, {user.first_name} {user.last_name}</h1>
      <UserInfo user={user} reviews={reviews} />

      <h2>Your Listings</h2>
      {listings.length > 0 ? (
        <CarListings listings={listings} setListings={setListings} />
      ) : (
        <p>You have no active listings. Create one <a href="/create-listing">here</a>.</p>
      )}
    </div>
  );
}

export default ProfilePage;

























