import React from 'react';
import SearchBar from './SearchBar';
import ListingList from './ListingList';
import mockCarList from '../mocks/mockCarList';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Lemonator</h1>
      <SearchBar />
      <ul>
        <ListingList cars={mockCarList} />
      </ul>
    </div>
  );
}

export default LandingPage;
