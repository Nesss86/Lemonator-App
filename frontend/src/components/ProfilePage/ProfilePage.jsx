import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import UserInfo from './UserInfo';
import CarListings from './CarListings';
import '../../styles/ProfilePage.scss';

function ProfilePage({ listings, setCarListings}) {
  const [user, setUser] = useState(null);
 // const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Track any errors during fetch

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
          setError('No user found in local storage. Please log in.');
          return;
        }

        const response = await api.get(`/profile/${storedUser.id}`);
        console.log('Profile Response:', response.data);
        setUser(response.data.user);
        setCarListings(response.data.listings);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>Error loading profile. Please try again later.</div>;

  return (
    <div className="profile-page">
      <h1>Welcome to Your Profile, {user.first_name} {user.last_name}</h1>
      <UserInfo user={user} />

      <h2>Your Listings</h2>
      {listings.length > 0 ? (
        <CarListings listings={listings} setListings={setCarListings} />
      ) : (
        <p>You have no active listings. Create one <a href="/create-listing">here</a>.</p>
      )}
    </div>
  );
}

export default ProfilePage;










