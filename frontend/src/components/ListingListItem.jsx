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
        <h3>{car.year} {car.make} {car.model}</h3>
        <div className="listing-list__details">
        <p>Mileage: {car.mileage} km</p>
        <p>Location: {car.city} </p>
        </div>
        
        <hr />
        <div className="listing-list__car-price">
        <p>Price: ${car.price}</p>
        </div>
        <button className="listing-list__button">View Details</button>
      </div>
    </li>
  );

};

export default ListingListItem;
