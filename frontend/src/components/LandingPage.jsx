import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import ListingList from './ListingList';
import { useState, useEffect } from 'react';

function LandingPage({ cars, setCarListings }) {
  const location = useLocation(); // Get the current location
  const [filteredCars, setFilteredCars] = useState([]); // Manage filtered cars

  useEffect(() => {
    if (cars && cars.length > 0) {
      setFilteredCars([...cars].sort((a, b) => a.id - b.id));
    }
  }, [cars]);

  useEffect(() => {
    if (location.pathname === '/' && cars) {
      setFilteredCars([...cars].sort((a, b) => a.id - b.id));
    }
  }, [location, cars]);

  return (
    <div>
      <SearchBar cars={cars} setFilteredCars={setFilteredCars} />
      <ListingList cars={filteredCars} setCarListings={setCarListings} />
    </div>
  );
}

export default LandingPage;

