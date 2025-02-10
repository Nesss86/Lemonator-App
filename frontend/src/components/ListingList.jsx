import React from 'react';
import ListingListItem from './ListingListItem';
import "../styles/ListingList.scss";

const ListingList = ({ cars, setCarListings }) => {
  return (
    <div className="listing-container">
    <h2 className="listing-title">Explore our Listings</h2>
    <ul className="listing-list">
      
      {cars.map((car) => (
        <ListingListItem key={car.id} car={car} setCarListings={setCarListings} />
      ))}
    </ul>
    </div>
    
  );
};

export default ListingList;