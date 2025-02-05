import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.scss";

function NavigationBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/'; // Redirect to home after logout
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
            <span className="dropdown-toggle">My Account</span>
            <ul className="dropdown-menu">
              <li><Link to="/create-listing">Create a Listing</Link></li>
              <li><Link to="/my-listings">My Listings</Link></li>
              <li><Link to="/favourites">Favourites</Link></li>
              <li><Link to="/messages">Messages</Link></li>
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





