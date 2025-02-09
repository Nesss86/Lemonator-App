import axios from 'axios';

/**
 * Generates a response from OpenAI using a backend API call.
 * @param {string} prompt - The user's input question or statement.
 * @returns {string} The AI's response or an error message if the API call fails.
 */
export const generateResponse = async (prompt) => {
  try {
    // Use environment variable for backend API base URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

    const response = await axios.post(`${backendUrl}/api/ask`, { question: prompt });

    // Ensure the response has valid data
    if (response.data && response.data.response) {
      return response.data.response.trim();
    } else {
      console.warn('No AI response available from the backend.');
      return 'I couldn’t generate a response at the moment. Please try again later.';
    }
  } catch (error) {
    // Handle cases where error response might be undefined
    const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
    console.error('Error contacting the backend chatbot API:', errorMessage);

    return `Sorry, something went wrong while processing your request: ${errorMessage}`;
  }
};






