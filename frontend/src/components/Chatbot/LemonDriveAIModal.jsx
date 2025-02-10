import React, { useState, useEffect } from 'react';
import "../../styles/Chatbot.scss";  // Ensure correct styles are applied
import ChatbotWrapper from '../Chatbot/ChatbotWrapper'; // Import the ChatbotWrapper

function LemonDriveAIModal({ showModal, setShowModal }) {

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowModal(false); // Close modal when clicking the overlay
    }
  };

  const handleCloseClick = () => {
    setShowModal(false); // Close modal when clicking the close button
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowModal(false); // Close modal on Escape key
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setShowModal]);

  if (!showModal) return null;  // Don't render modal if `showModal` is false

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={handleCloseClick}>✖</button>
        <h2>LemonDriveAI - Car Advisor</h2>

        {/* Render the Chatbot component inside the modal */}
        <ChatbotWrapper />

      </div>
    </div>
  );
}

export default LemonDriveAIModal;






