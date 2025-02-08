import React from 'react';
import '../styles/AboutPage.scss';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
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
      </div>
    </div>
  );
};

export default AboutPage;
