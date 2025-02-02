import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.scss";

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <div className="logo-section">
        <div className="logo">
          <Link to="/">Lemonator</Link>
        </div>
        <img src="/lemon3.svg" alt="Lemon Icon" className="lemon-icon" />
      </div>

      <ul className="nav-links">
        <li><Link to="/browse-cars">Browse Cars</Link></li>
        <li><Link to="/sell-your-car">Sell Your Car</Link></li>
        <li><Link to="/help">Help/Contact Us</Link></li>
      </ul>

      <div className="auth-buttons">
        <Link to="/login" className="btn">Log In</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;



