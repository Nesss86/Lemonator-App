import React from "react";

import "../styles/ListingListItem.scss";

const ListingListItem = ({ car }) => {

  return (
    <li className="listing-list__item">
    <img className="listing-list__image"
        src={car.image}
        alt={`${car.make} ${car.model}`}
      />

      <div className="listing-list__car-details">
        <h3>{car.make} {car.model}</h3>
        <p>Year: {car.year}</p>
        <p>Mileage: {car.mileage} km</p>
        <p>Price: ${car.price}</p>
        <p>Location: {car.city}</p>
      </div>
    </li>
  );

};

export default ListingListItem;
