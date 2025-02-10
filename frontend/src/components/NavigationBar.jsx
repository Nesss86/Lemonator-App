import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUnreadMessages, markMessagesAsRead } from "../api/api";
import LemonDriveAIModal from "./Chatbot/LemonDriveAIModal"; // Correct modal import
import "../styles/NavBar.scss";
import axios from "axios"; // For API requests

function NavigationBar() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  // Fetch unread messages for the user
  const fetchUnreadMessages = useCallback(async () => {
    try {
      if (user && user.id) {
        const response = await getUnreadMessages(user.id);
        setHasUnreadMessages(response.status === 200 && response.data.length > 0);
      }
    } catch (error) {
      console.warn("No unread messages or an issue fetching messages for user:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchUnreadMessages(); // Fetch on component mount
    const interval = setInterval(fetchUnreadMessages, 10000); // Poll every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [fetchUnreadMessages]);

  const handleMessagesClick = async () => {
    try {
      await markMessagesAsRead(user.id);
      setHasUnreadMessages(false);
      navigate("/messages");
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  // Fetch user details for quick login
  const quickLogin = async (userId) => {
    try {
      const response = await axios.get(`/quick_login/${userId}`);
      if (response.status === 200) {
        const loggedInUser = response.data;
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        navigate("/profile");
        // Trigger an artificial page-wide update by emitting a custom event
        window.dispatchEvent(new Event("userUpdated"));
      }
    } catch (error) {
      console.error("Quick login failed:", error);
    }
  };

  useEffect(() => {
    // Listen for quick login updates across the app
    const handleUserUpdate = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  return (
    <nav className="navigation-bar">
      <div className="logo-section">
        <div className="logo">
          <Link to="/">Lemonator</Link>
        </div>
        <img src="/lemon3.svg" alt="Lemon Icon" className="lemon-icon" />
        {user && (
          <div className="welcome-message">
            <p>Welcome, {user.first_name}!</p>
          </div>
        )}
      </div>

      <ul className="nav-links">
        <li><Link to="/">Browse Cars</Link></li>
        <li><Link to="/about">About</Link></li>

        {/* Add LemonDriveAI link to trigger modal */}
        <li><Link to="#" onClick={() => setShowModal(true)}>LemonDriveAI</Link></li> {/* Modal Trigger Link */}

        {user && (
          <li className="dropdown">
            <Link to="/profile" className="dropdown-toggle">My Account</Link>
            <ul className="dropdown-menu">
              <li><Link to="/create-listing">Create a Listing</Link></li>
              <li><Link to="/my-listings">My Listings</Link></li>
              <li><Link to="/favourites">Favourites</Link></li>
              <li>
                <button onClick={handleMessagesClick} className="dropdown-link messages-button">
                  Messages
                  <span className="messages-icon">
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

        {/* Quick Login Buttons */}
        <button className="btn quick-login-btn" onClick={() => quickLogin(1)}>Quick Login User 1</button>
        <button className="btn quick-login-btn" onClick={() => quickLogin(2)}>Quick Login User 2</button>
      </div>

      {/* Include the LemonDriveAIModal */}
      <LemonDriveAIModal showModal={showModal} setShowModal={setShowModal} />
    </nav>
  );
}

export default NavigationBar;
































