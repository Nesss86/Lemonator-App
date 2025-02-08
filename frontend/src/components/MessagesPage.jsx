import React, { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import "../styles/Messages.scss";

const MessagesPage = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [newReplies, setNewReplies] = useState({});
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [error, setError] = useState(null);

  // Fetch conversations for the current user
  const fetchConversations = useCallback(async () => {
    try {
      const response = await api.get(`/conversations?user_id=${user.id}`);
      if (Array.isArray(response.data)) {
        setConversations(response.data);
      } else {
        setError("Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching conversations:", err);
      setError("Failed to load conversations.");
    }
  }, [user.id]);

  // Fetch unread messages
  const fetchUnreadMessages = useCallback(async () => {
    try {
      const response = await api.get(`/messages/unread/${user.id}`);
      setUnreadMessages(response.data.length || 0);
    } catch (err) {
      console.error("Error fetching unread messages:", err);
    }
  }, [user.id]);

  useEffect(() => {
    fetchConversations();
    fetchUnreadMessages();
  }, [fetchConversations, fetchUnreadMessages]);

  // Mark messages as read
  const handleMarkAsRead = async () => {
    try {
      await api.patch(`/messages/mark_as_read/${user.id}`);
      setUnreadMessages(0);
    } catch (err) {
      console.error("Error marking messages as read:", err);
    }
  };

  // Handle input change for replies
  const handleReplyChange = (conversationId, value) => {
    setNewReplies((prev) => ({ ...prev, [conversationId]: value }));
  };

  // Handle reply submission
  const handleReplySubmit = async (e, conversationId) => {
    e.preventDefault();
    const replyContent = newReplies[conversationId]?.trim();
    if (!replyContent) {
      alert("Reply cannot be empty.");
      return;
    }

    try {
      await api.post(`/conversations/${conversationId}/messages`, {
        buyer_id: user.id,
        content: replyContent,
      });
      setNewReplies((prev) => ({ ...prev, [conversationId]: "" })); // Clear input
      fetchConversations(); // Refresh conversations after sending message
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send the message.");
    }
  };

  // Handle conversation deletion
  const handleDeleteConversation = async (conversationId) => {
    if (!window.confirm("Are you sure you want to delete this conversation?")) return;

    try {
      await api.delete(`/conversations/${conversationId}`);
      setConversations((prev) => prev.filter((convo) => convo.id !== conversationId));
      fetchUnreadMessages();
    } catch (err) {
      console.error("Error deleting conversation:", err);
      alert("Failed to delete the conversation.");
    }
  };

  // Display any errors encountered
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="messages-page">
      <h2>Conversations</h2>

      {/* Unread message notification */}
      {unreadMessages > 0 && (
        <div className="notification-banner">
          <p>You have {unreadMessages} unread message(s).</p>
        </div>
      )}

      <div className="messages-container">
        {conversations.length === 0 ? (
          <p>No conversations available.</p>
        ) : (
          conversations.map((convo) => {
            // Handle undefined issues by falling back to default values
            const otherUser = convo.other_user || { first_name: "Unknown", last_name: "" };
            const otherUserName = `${otherUser.first_name} ${otherUser.last_name}`.trim();

            return (
              <div
                key={convo.id}
                className={`conversation ${convo.messages.some(
                  (msg) => msg.seller_id === user.id && !msg.read_status
                ) ? "unread" : ""}`}
                onClick={handleMarkAsRead}
              >
                <h3>
                  Conversation with {otherUserName}
                  {convo.messages.some((msg) => msg.seller_id === user.id && !msg.read_status) && (
                    <span className="notification-badge">Unread</span>
                  )}
                </h3>

                {/* Display messages */}
                <ul className="message-list">
                  {Array.isArray(convo.messages) && convo.messages.length > 0 ? (
                    convo.messages.map((msg) => (
                      <li key={msg.id} className={`message-item ${msg.buyer_id === user.id ? "sent" : "received"}`}>
                        <p>
                          <strong>
                            {msg.buyer_id === user.id ? "You" : `${msg.sender_first_name} ${msg.sender_last_name}`}:
                          </strong>{" "}
                          {msg.content}
                        </p>
                        <small>{new Date(msg.created_at).toLocaleString()}</small>
                      </li>
                    ))
                  ) : (
                    <p>No messages in this conversation.</p>
                  )}
                </ul>

                {/* Reply Form */}
                <form onSubmit={(e) => handleReplySubmit(e, convo.id)} className="reply-form">
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

                {/* Delete Conversation Button */}
                <button onClick={() => handleDeleteConversation(convo.id)} className="delete-conversation-btn">
                  Delete Conversation
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MessagesPage;






















































