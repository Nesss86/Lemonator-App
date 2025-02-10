import React, { useState } from "react";
import FavIcon from "./FavIcon";
import "../styles/FavButton.scss";

const FavButton = ({ car }) => {
  const user = JSON.parse(localStorage.getItem("user"));  // Get the logged-in user
  const storageKey = `favorites_${user?.id}`;  // Store favorites based on user ID

  const [isFavorited, setIsFavorited] = useState(() => {
    const savedFavorites = JSON.parse(localStorage.getItem(storageKey)) || [];
    return savedFavorites.some((fav) => fav.id === car.id);
  });

  // Toggle favorite state
  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem(storageKey)) || [];

    let updatedFavorites;
    if (isFavorited) {
      // Remove from favorites
      updatedFavorites = savedFavorites.filter((fav) => fav.id !== car.id);
    } else {
      // Add to favorites (avoid duplicates)
      updatedFavorites = [...savedFavorites, car];
    }

    // Update localStorage and state
    localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);

    // Dispatch event to notify other components
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div className="car-list__fav-icon" onClick={toggleFavorite}>
      <FavIcon selected={isFavorited} />
    </div>
  );
};

export default FavButton;



