import React from 'react';
import "../../styles/UserInfo.scss";

function UserInfo({ user, reviews }) {
  const profilePicture = user.profile_picture_url
    ? user.profile_picture_url
    : `http://localhost:3000/images/profile_pictures/default-profile.jpg`;

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
          <h3>Ratings & Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="user-info__review">
                <span className="potatoes">{'🥔'.repeat(review.potatoes)}</span>
                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;






















