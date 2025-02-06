import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/Messages.scss";

const MessagesPage = ({ user }) => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/inbox/${user.id}`);
        setReceivedMessages(response.data.received);
        setSentMessages(response.data.sent);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [user]);

  const handleDeleteMessage = async (messageId, isSent) => {
    try {
      await api.delete(`/messages/${messageId}`);
      if (isSent) {
        setSentMessages(sentMessages.filter((msg) => msg.id !== messageId));
      } else {
        setReceivedMessages(receivedMessages.filter((msg) => msg.id !== messageId));
      }
      alert("Message deleted successfully.");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete the message. Please try again.");
    }
  };

  return (
    <div className="messages-page">
      <h2>My Messages</h2>

      <div className="messages-container">
        {/* Received Messages Section */}
        <div className="received-messages">
          <h3>Received Messages</h3>
          {receivedMessages.length === 0 ? (
            <p>No received messages.</p>
          ) : (
            <ul>
              {receivedMessages.map((msg) => (
                <li key={msg.id} className="message-item">
                  <p><strong>From:</strong> User {msg.buyer_id}</p>
                  <p><strong>Message:</strong> {msg.content}</p>
                  <p><strong>Time:</strong> {new Date(msg.created_at).toLocaleString()}</p>
                  <button onClick={() => handleDeleteMessage(msg.id, false)} className="delete-btn">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <hr className="separator" />

        {/* Sent Messages Section */}
        <div className="sent-messages">
          <h3>Sent Messages</h3>
          {sentMessages.length === 0 ? (
            <p>No sent messages.</p>
          ) : (
            <ul>
              {sentMessages.map((msg) => (
                <li key={msg.id} className="message-item">
                  <p><strong>To:</strong> User {msg.seller_id}</p>
                  <p><strong>Message:</strong> {msg.content}</p>
                  <p><strong>Time:</strong> {new Date(msg.created_at).toLocaleString()}</p>
                  <button onClick={() => handleDeleteMessage(msg.id, true)} className="delete-btn">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;





