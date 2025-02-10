import React, { useState, useEffect } from "react";
import ListingListItem from "../components/ListingListItem";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  // Listen for updates from the `FavButton`
  useEffect(() => {
    const updateFavorites = () => {
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    };
    
    window.addEventListener("favoritesUpdated", updateFavorites);
    return () => window.removeEventListener("favoritesUpdated", updateFavorites);
  }, []);

  return (
    <div>
      <h2>My Favourites</h2>
      {favorites.length === 0 ? (
        <p>No favorite listings yet.</p>
      ) : (
        <ul>
          {favorites.map((car) => (
            <ListingListItem key={car.id} car={car} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
