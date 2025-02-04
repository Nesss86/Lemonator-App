import React from 'react';
import SearchBar from './SearchBar';
import ListingList from './ListingList';

function LandingPage({ cars }) {
  return (
    <div>
      <h1>Welcome to Lemonator</h1>
      <SearchBar />
      <ListingList cars={cars} />
    </div>
  );
}

export default LandingPage;

