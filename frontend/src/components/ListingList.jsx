import React from 'react';
import ListingListItem from './ListingListItem';

const ListingList = ({ cars }) => {
  return (
    <ul className="listing-list">
      {cars.map((car) => (
        <ListingListItem key={car.id} car={car} />
      ))}
    </ul>
  );
};

export default ListingList;