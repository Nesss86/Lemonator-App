import React, { useState } from "react";
import api from "../api/api";  // Use Axios to send the message

const MessageForm = ({ buyerId, conversationId, onMessageSent }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/conversations/${conversationId}/messages`, {
        buyer_id: buyerId,
        content: message,
      });

      console.log("Message sent successfully", response.data);
      onMessageSent(response.data);  // Notify parent component
      setMessage("");  // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        required
      ></textarea>
      <button type="submit">Send Message</button>
    </form>
  );
};

export default MessageForm;


