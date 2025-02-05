import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import ListingList from './ListingList';
import { useState, useEffect } from 'react';

function LandingPage({ cars }) {
  const [filteredCars, setFilteredCars] = useState(cars); // Manage filtered cars
  const location = useLocation(); // Get the current location

  // Update filteredCars when cars prop changes
  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  // Reset filteredCars to show all cars when the route changes to "/"
  useEffect(() => {
    if (location.pathname === '/') {
      setFilteredCars(cars);
    }
  }, [location, cars]);

  return (
    <div>
      <h1>Welcome to Lemonator</h1>
      <SearchBar cars={cars} setFilteredCars={setFilteredCars} />
      <ListingList cars={filteredCars} />
    </div>
  );
}

export default LandingPage;

