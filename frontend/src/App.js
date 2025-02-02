import React from "react";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/browse-cars" element={<div>Browse Cars Page</div>} />
        <Route path="/sell-your-car" element={<div>Sell Your Car Page</div>} />
        <Route path="/help" element={<div>Help/Contact Us Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/signup" element={<div>Sign Up Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;

