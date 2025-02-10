import React, { useState, useEffect } from "react";
import FavIcon from "./FavIcon";
import '../styles/FavButton.scss';

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
    <div className="car-list__fav-icon" onClick={toggleFavorite}>
      <div className="car-list__fav-icon-svg">
      <FavIcon selected={isFavorited} />
      </div>
    </div>
  );
};

export default FavButton;
