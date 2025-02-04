import React from 'react';
import "../../styles/UserInfo.scss";

function UserInfo({ user }) {
  // Ensure profile picture uses a fallback if URL is not provided
  const profilePicture = user.profile_picture_url
    ? user.profile_picture_url
    : `http://localhost:3000/images/profile_pictures/default-profile.jpg`;

  // Randomized reviews with varying star ratings
  const reviews = [
    { content: "Great deal, very clean!", stars: 5 },
    { content: "Best car ever!", stars: 1 },
    { content: "Responsive and helpful throughout the process.", stars: 5 },
    { content: "Minor delay in response, but good overall.", stars: 3 },
    { content: "Car was exactly as described. Happy with my purchase.", stars: 4 },
  ];

  return (
    <div className="user-info">
      <div className="user-info__left">
        <img
          src={profilePicture}
          alt={`${user.first_name} ${user.last_name}`}
          className="user-info__profile-pic"
        />
        <h2>{user.first_name} {user.last_name}</h2>
        <p><strong>Email:</strong> {user.email || 'Not available'}</p>
        <p><strong>Phone:</strong> {user.phone_number || 'Not provided'}</p>
        <p><strong>Location:</strong> {user.location || 'Unknown'}</p>
      </div>

      <div className="user-info__right">
        <div className="user-info__actions">
          <button className="btn">Edit Profile</button>
        </div>
        <div className="user-info__ratings">
          <h3>User Ratings & Reviews</h3>
          {reviews.map((review, index) => (
            <div key={index} className="user-info__review">
              <span className="stars">{'⭐'.repeat(review.stars)}</span>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;














