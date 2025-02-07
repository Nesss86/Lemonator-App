import React, { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import "../styles/Messages.scss";

const MessagesPage = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [newReplies, setNewReplies] = useState({});
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Fetch unread messages count only if the current user is the recipient (not the sender)
  const fetchUnreadMessages = useCallback(async () => {
    try {
      const response = await api.get(`/messages/unread/${user.id}`);
      const unreadForUser = response.data.filter((msg) => msg.seller_id === user.id);
      setUnreadMessages(unreadForUser.length);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  }, [user.id]);

  // Fetch conversations for the current user
  const fetchConversations = useCallback(async () => {
    try {
      const response = await api.get(`/conversations?user_id=${user.id}`);
      if (Array.isArray(response.data)) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchConversations();
    fetchUnreadMessages();
  }, [fetchConversations, fetchUnreadMessages]);

  // Clear unread messages when clicking on a conversation
  const handleMarkAsRead = async () => {
    try {
      await api.patch(`/messages/mark_as_read/${user.id}`);
      setUnreadMessages(0);  // Clear unread state locally
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  // Handle input change for new replies
  const handleReplyChange = (conversationId, value) => {
    setNewReplies((prev) => ({ ...prev, [conversationId]: value }));
  };

  // Handle reply submission
  const handleReplySubmit = async (e, conversationId, recipientId) => {
    e.preventDefault();

    if (!newReplies[conversationId]?.trim()) {
      return alert("Reply cannot be empty!");
    }

    try {
      await api.post(`/conversations/${conversationId}/messages`, {
        buyer_id: user.id,
        content: newReplies[conversationId],
      });

      // Clear the reply input field and refresh conversations
      setNewReplies((prev) => ({ ...prev, [conversationId]: "" }));

      // Refresh only if the recipient is NOT the sender
      if (recipientId !== user.id) {
        fetchUnreadMessages();
      }

      fetchConversations();
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send the message. Please try again.");
    }
  };

  // Handle conversation deletion
  const handleDeleteConversation = async (conversationId) => {
    if (!window.confirm("Are you sure you want to delete this conversation?")) return;

    try {
      await api.delete(`/conversations/${conversationId}`);
      setConversations((prev) => prev.filter((convo) => convo.id !== conversationId));
      fetchUnreadMessages();
    } catch (error) {
      console.error("Error deleting conversation:", error);
      alert("Failed to delete the conversation.");
    }
  };

  return (
    <div className="messages-page">
      <h2>Conversations</h2>

      {/* Unread notification */}
      {unreadMessages > 0 && (
        <div className="notification-banner">
          <p>You have {unreadMessages} unread messages.</p>
        </div>
      )}

      <div className="messages-container">
        {conversations.length === 0 ? (
          <p>No conversations available.</p>
        ) : (
          conversations.map((convo) => (
            <div
              key={convo.id}
              className={`conversation ${convo.messages.some(
                (msg) => msg.seller_id === user.id && !msg.read_status
              ) ? "unread" : ""}`}
              onClick={handleMarkAsRead}
            >
              <h3>
                Conversation with User {convo.other_user_id}
                {convo.messages.some((msg) => msg.seller_id === user.id && !msg.read_status) && (
                  <span className="notification-badge">Unread</span>
                )}
              </h3>
              <ul className="message-list">
                {Array.isArray(convo.messages) && convo.messages.length > 0 ? (
                  convo.messages.map((msg) => (
                    <li key={msg.id} className={`message-item ${msg.buyer_id === user.id ? "sent" : "received"}`}>
                      <p>
                        <strong>{msg.buyer_id === user.id ? "You" : `User ${msg.buyer_id}`}:</strong> {msg.content}
                      </p>
                      <p>
                        <small>{new Date(msg.created_at).toLocaleString()}</small>
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No messages in this conversation.</p>
                )}
              </ul>

              {/* Reply Form */}
              <form onSubmit={(e) => handleReplySubmit(e, convo.id, convo.other_user_id)} className="reply-form">
                <input
                  type="text"
                  className="reply-input"
                  placeholder="Type your reply..."
                  value={newReplies[convo.id] || ""}
                  onChange={(e) => handleReplyChange(convo.id, e.target.value)}
                  required
                />
                <button type="submit" className="reply-btn">Send Reply</button>
              </form>

              {/* Delete Button */}
              <button onClick={() => handleDeleteConversation(convo.id)} className="delete-conversation-btn">
                Delete Conversation
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesPage;


















































