import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',  // Backend base URL
  withCredentials: true,             // Ensure credentials like cookies or headers are sent
});

export default api;
