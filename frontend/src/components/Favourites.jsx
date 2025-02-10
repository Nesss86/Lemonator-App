import React, { useState, useEffect } from "react";
import ListingListItem from "../components/ListingListItem";
import "../styles/Favorites.scss";

const Favourites = () => {
  const user = JSON.parse(localStorage.getItem("user"));  // Get the user once on mount

  // Lazy initialization: load favorites directly during initial state setup
  const [favorites, setFavorites] = useState(() => {
    if (!user || !user.id) return [];
    return JSON.parse(localStorage.getItem(`favorites_${user.id}`)) || [];
  });

  // Listen for updates from the `FavButton` via the `favoritesUpdated` event
  useEffect(() => {
    const updateFavorites = () => {
      if (!user || !user.id) return;
      const updatedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.id}`)) || [];
      setFavorites(updatedFavorites);
    };

    window.addEventListener("favoritesUpdated", updateFavorites);
    return () => window.removeEventListener("favoritesUpdated", updateFavorites);
  }, [user]);  // Correctly listening to the `user` without causing loops

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">My Favourites</h2>
      {favorites.length === 0 ? (
        <p>No favorite listings yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((car) => (
            <ListingListItem key={car.id} car={car} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;





