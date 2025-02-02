import React, { useEffect, useState } from 'react';
import api from '../api/api';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await api.get(`/profile?id=${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <h1>Welcome, {user.first_name} {user.last_name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default ProfilePage;

