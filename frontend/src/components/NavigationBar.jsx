import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/NavBar.scss";
import api from '../api/api';

function NavigationBar() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user'));
  });
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUnreadMessages(user.id);

      // Set up polling for unread messages every 10 seconds
      const interval = setInterval(() => {
        fetchUnreadMessages(user.id);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchUnreadMessages = async (userId) => {
    try {
      const response = await api.get(`/messages/unread/${userId}`);
      setHasUnreadMessages(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  const handleMessagesClick = async () => {
    if (user) {
      await api.patch(`/messages/mark_as_read/${user.id}`);
      setHasUnreadMessages(false);
      navigate('/messages');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="navigation-bar">
      <div className="logo-section">
        <div className="logo">
          <Link to="/">Lemonator</Link>
        </div>
        <img src="/lemon3.svg" alt="Lemon Icon" className="lemon-icon" />
      </div>

      <ul className="nav-links">
        <li><Link to="/">Browse Cars</Link></li>
        <li><Link to="/help">Help/Contact Us</Link></li>

        {user && (
          <li className="dropdown">
            <Link to="/profile" className="dropdown-toggle">
              My Account
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/create-listing">Create a Listing</Link></li>
              <li><Link to="/my-listings">My Listings</Link></li>
              <li><Link to="/favourites">Favourites</Link></li>
              <li>
                <button onClick={handleMessagesClick} className="dropdown-link messages-button">
                  Messages
                  <span className="messages-icon" aria-label="Unread Messages Notification">
                    <i className="fa fa-envelope"></i>
                    {hasUnreadMessages && <span className="notification-dot"></span>}
                  </span>
                </button>
              </li>
            </ul>
          </li>
        )}
      </ul>

      <div className="auth-buttons">
        {user ? (
          <button className="btn logout-btn" onClick={handleLogout}>Log Out</button>
        ) : (
          <>
            <Link to="/login" className="btn">Log In</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;








