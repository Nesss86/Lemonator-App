import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import UserInfo from './UserInfo';
import CarListings from './CarListings';  // Import CarListings component
import '../../styles/ProfilePage.scss';  // Make sure the profile page has its own style

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
          console.error('No user found in local storage');
          return;
        }

        const response = await api.get(`/profile?id=${storedUser.id}`);
        console.log('Profile Response:', response.data);  // Log the response to help debug
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);  // Set loading to false after fetching data
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>Error loading profile. Please try again later.</div>;

  return (
    <div className="profile-page">
      <h1>Welcome to Your Profile, {user.first_name} {user.last_name}</h1>
      <UserInfo user={user} />

      <h2>Your Listings</h2>
      <CarListings userId={user.id} />  {/* Pass userId if needed for filtering listings */}
    </div>
  );
}

export default ProfilePage;








