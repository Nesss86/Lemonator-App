import React, { useState } from 'react';
import api from '../api/api';

function MessageForm({ buyerId, sellerId, onMessageSent }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    try {
      const response = await api.post('/messages', {
        buyer_id: buyerId,
        seller_id: sellerId,
        content: message,
      });

      // Display success message or callback
      setStatus('Message sent successfully!');
      onMessageSent(response.data);  // Trigger any callback if needed

      // Clear input after successful send
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Failed to send message.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows="4"
          cols="50"
          required
        ></textarea>
        <br />
        <button type="submit">Send Message</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default MessageForm;
