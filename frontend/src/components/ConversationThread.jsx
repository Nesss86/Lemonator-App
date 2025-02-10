import React, { useEffect, useState, useRef } from "react";
import { sendMessage } from "../api/api";

function ConversationThread({ conversation, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch messages whenever the conversation ID or user changes
  useEffect(() => {
    async function fetchMessages() {
      if (!conversation || !conversation.id || !user || !user.id) return;

      try {
        const response = await fetch(`/conversations/${conversation.id}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, [conversation?.id, user?.id]);  // Added user.id to dependency array

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const newMessageData = {
      buyer_id: user.id,
      content: newMessage,
      conversation_id: conversation?.id,
      id: Date.now(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessageData]);

    try {
      const response = await sendMessage(
        conversation?.id,
        user.id,
        conversation?.seller_id || user.id,  // Pass seller_id or default to user.id
        newMessage
      );

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessageData.id ? { ...msg, id: response.data.id } : msg
        )
      );
      setNewMessage("");  // Clear the input
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="conversation-thread">
      <h3>Conversation with User {conversation?.other_user_id || "Unknown"}</h3>

      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.buyer_id === user.id ? "You" : "Seller"}:</strong> {msg.content}
            <br />
            <small>{new Date(msg.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>

      <div ref={messagesEndRef} />

      <form onSubmit={handleSendMessage}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          required
        />
        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ConversationThread;



















