import React, { useState } from "react";
import "../styles/ListingListItem.scss";
import { ensureConversation, sendMessage } from "../api/api";
import { Link } from "react-router-dom";

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
      const sellerId = car.user?.id;

      if (!sellerId) {
        alert("Cannot send a message. Seller information is missing.");
        return;
      }

      const conversationResponse = await ensureConversation(buyerId, sellerId);
      const conversationId = conversationResponse.data.id;

      await sendMessage(conversationId, buyerId, sellerId, messageContent);

      alert("Message sent successfully!");
      setMessageFormOpen(false);
      setMessageContent("");
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
        <p>Seller: {car.user?.name || "Unknown Seller"}</p>
        <p className="listing-list__mileage">
          <span>Mileage: {car.mileage} km</span>
          <span>Location: {car.city}</span>
        </p>
        <hr />
        <p className="listing-list__price">Price: {formatPrice(car.price_cents)}</p>

        <div className="listing-list__buttons">
          <Link to={`/listing/${car.id}`} className="listing-list__button">View Details</Link>
          <button onClick={handleMessageSeller} className="listing-list__button message-seller-btn">
            Message Seller
          </button>
        </div>

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
















