import React, { useState } from 'react';
import '../styles/AboutPage.scss';

const AboutPage = () => {
  const [showRealContacts, setShowRealContacts] = useState(false);

  return (
    <div className="about-page">
      <div className={`container ${showRealContacts ? 'expanded' : ''}`}>
        <div className="toggle-container">
          <button 
            className="btn toggle-btn"
            onClick={() => setShowRealContacts(!showRealContacts)}
          >
            {showRealContacts ? "Show Website Info" : "Show Team Contact Info"}
          </button>
        </div>

        {showRealContacts ? (
          <div className="team-container">
            <img src="/lemon3.svg" alt="Lemon Icon" className="lemon-icon" />
            <h1>Meet the <strong>Lemonator™</strong> Team</h1>
            <div className="team-grid">
              {[
                { name: "Vanessa Little", github: "https://github.com/Nesss86", email: "Vanessa.Christine.Little@gmail.com", linkedin: "https://www.linkedin.com/in/vanessa-little-47985866", profilePic: "/images/profile_pictures/vanessa_profile.jpg" },
                { name: "Saurav Dhillon", github: "https://github.com/sauravdhillon", email: "saurav@example.com", linkedin: "https://www.linkedin.com/in/saurav-dhillon", profilePic: "/images/profile_pictures/saurav_profile.jpg" },
                { name: "Gustavo De Moura", github: "https://github.com/gustavodemoura", email: "gustavo@example.com", linkedin: "https://www.linkedin.com/in/gustavo-de-moura", profilePic: "/images/profile_pictures/gustavo_profile.jpg" }
              ].map((contact, index) => (
                <div key={index} className="team-member">
                  <img src={contact.profilePic} alt={`${contact.name}'s Profile`} className="profile-pic"/>
                  <strong>{contact.name}</strong>
                  <p className="contact-info">GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer">{contact.github}</a></p>
                  <p className="contact-info">Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                  <p className="contact-info">LinkedIn: <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{contact.linkedin}</a></p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <img src="/lemon3.svg" alt="Lemon Icon" className="lemon-icon" />
            <h1>About <strong>Lemonator™</strong></h1>
            <p>
              Welcome to Lemonator™! You don't need a new car! We are dedicated to providing a seamless and user-friendly experience for buying and selling the best used cars in the market. Our mission is to connect buyers and sellers efficiently while ensuring transparency and trust. You'll never find any lemons here!
            </p>
            <h2>Our Vision</h2>
            <p>
              We strive to create a marketplace where users can confidently browse, list, and communicate about cars. Our goal is to make car transactions smooth and hassle-free for everyone.
            </p>
            <h2>Why Choose Us?</h2>
            <ul>
              <li>Easy-to-use interface</li>
              <li>Secure messaging system</li>
              <li>Comprehensive car listings</li>
              <li>Dedicated customer support</li>
            </ul>
            <h2>Contact Us</h2>
            <p>
              Have questions? Feel free to reach out to us at <a href="mailto:support@lemonator.com">support@lemonator.com</a>.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutPage;








