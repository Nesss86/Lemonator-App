import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`Response error: ${error.response.status} ${error.response.statusText}`, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    return Promise.reject(error);
  }
);

// Function to get all conversations for a user
export const getConversations = (userId) => api.get(`/conversations?user_id=${userId}`);

// Function to create or fetch an existing conversation
export const ensureConversation = (buyerId, sellerId) => {
  return api.post(`/conversations`, { buyer_id: buyerId, seller_id: sellerId });
};

// Function to send a new message within a conversation
export const sendMessage = (conversationId, buyerId, sellerId, content) => {
  return api.post(`/conversations/${conversationId}/messages`, {
    buyer_id: buyerId,
    seller_id: sellerId,
    content: content,
  });
};

// Function to delete a conversation
export const deleteConversation = (conversationId) => api.delete(`/conversations/${conversationId}`);

// Function to get unread messages for a user
export const getUnreadMessages = (userId) => api.get(`/messages/unread/${userId}`);

// Function to mark all unread messages as read
export const markMessagesAsRead = (userId) => api.patch(`/messages/mark_as_read/${userId}`);

export default api;



















