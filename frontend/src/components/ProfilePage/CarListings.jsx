import React from 'react';
import "../../styles/CarListings.scss";
import { Link } from "react-router-dom";


function CarListings({ listings }) {
  if (!listings || listings.length === 0) {
    return <p>No car listings available.</p>;
  }

  return (
    <div className="car-listings">
      <ul className="car-listings__grid">
        {listings.map((car) => (
          <li key={car.id} className="car-listings__item">
            <div className="car-image-wrapper">
              <img
                className="car-image"
                src={car.images.length > 0 ? car.images[0] : 'https://via.placeholder.com/300'}
                alt={`${car.make} ${car.model}`}
              />
              <div className="car-details">
                <h3>{car.year} {car.make} {car.model}</h3>
                <p>{car.city} - {car.mileage} km</p>
                <div className="car-price">Price: ${(car.price_cents / 100).toLocaleString()}</div>
              </div>
              <Link to={`/edit-listing/${car.id}`} className="car-button">Edit Listing</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarListings;








