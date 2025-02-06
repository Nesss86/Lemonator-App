import React from "react";

import "../styles/ListingListItem.scss";

const ListingListItem = ({ car }) => {

  const formatPrice = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  }

  return (
    <li className="listing-list__item">
    <img className="listing-list__image"
        src={car.images && car.images[0] ? car.images[0] : 'https://via.placeholder.com/300'}
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
        <p>Price: {formatPrice(car.price_cents)}</p>
        </div>
        <button className="listing-list__button">View Details</button>
      </div>
    </li>
  );

};

export default ListingListItem;
