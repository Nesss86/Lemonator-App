import React, { useState } from "react";
import "../styles/ListingListItem.scss";
import api from "../api/api";

const ListingListItem = ({ car }) => {
  const [messageFormOpen, setMessageFormOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const handleMessageSeller = () => {
    setMessageFormOpen(!messageFormOpen);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      const buyerId = JSON.parse(localStorage.getItem("user")).id;
      const sellerId = car.user_id;  // Assuming `car` includes seller's `user_id`.

      await api.post("/messages", {
        buyer_id: buyerId,
        seller_id: sellerId,
        content: messageContent,
      });

      alert("Message sent successfully!");
      setMessageFormOpen(false);  // Close form after sending the message
      setMessageContent("");  // Clear form
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const formatPrice = (cents) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  return (
    <li className="listing-list__item">
      <img
        className="listing-list__image"
        src={car.images && car.images[0] ? car.images[0] : "https://via.placeholder.com/300"}
        alt={`${car.make} ${car.model}`}
      />

      <div className="listing-list__car-details">
        <h3>{car.year} {car.make} {car.model}</h3>
        <p>Mileage: {car.mileage} km</p>
        <p>Location: {car.city}</p>
        <p>Price: {formatPrice(car.price_cents)}</p>

        <div className="listing-list__buttons">
          {/* Keep the View Details button for the modal */}
          <button className="listing-list__button">View Details</button>

          {/* New Message Seller button */}
          <button onClick={handleMessageSeller} className="listing-list__button message-seller-btn">
            Message Seller
          </button>
        </div>

        {/* Conditionally display the message form */}
        {messageFormOpen && (
          <form className="message-form" onSubmit={handleSendMessage}>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type your message here..."
              required
            />
            <button type="submit" className="message-form__send-button">Send Message</button>
          </form>
        )}
      </div>
    </li>
  );
};

export default ListingListItem;




