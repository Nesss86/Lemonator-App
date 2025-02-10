import React, { useState, useEffect } from "react";
import FavIcon from "./FavIcon";

const FavButton = ({ car }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(savedFavorites.some((fav) => fav.id === car.id));
  }, [car.id]);

  // Toggle favorite state
  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (isFavorited) {
      // Remove from favorites
      const updatedFavorites = savedFavorites.filter((fav) => fav.id !== car.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      // Add to favorites (ensure no duplicates)
      const updatedFavorites = [...savedFavorites, car];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorited(true);
    }

    // Trigger an event for other components to sync state
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <button className="fav-button" onClick={toggleFavorite}>
      <FavIcon selected={isFavorited} />
    </button>
  );
};

export default FavButton;
