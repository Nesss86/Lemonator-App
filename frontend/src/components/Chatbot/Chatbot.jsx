import React, { useState } from 'react';
import { generateResponse } from '../../api/openaiApi';
import "../../styles/Chatbot.scss";

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m Lemo. Ask me anything about buying or selling cars on Lemonator!" }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Display user message
    const userMessage = { sender: "user", text: userInput };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Get AI response using backend
      const aiReply = await generateResponse(userInput);
      const aiMessage = { sender: "bot", text: aiReply };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't process your request." }
      ]);
    }

    setUserInput(""); // Clear input
  };

  return (
    <div className="chatbot-container">
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "bot" ? "bot-message" : "user-message"}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me about cars..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;



