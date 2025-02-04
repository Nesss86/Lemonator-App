import React from 'react';
import "../../styles/CarListings.scss";
import mockCarList from '../../mocks/mockCarList';

function CarListings() {
  return (
    <div className="car-listings">
      <ul className="car-listings__grid">
        {mockCarList.map((car, index) => (
          <li key={car.id} className="car-listings__item">
            <div className="car-image-wrapper">
              {index === 0 && <span className="sold-badge">Sold</span>} {/* Show "Sold" badge on the first item */}
              <img className="car-image" src={car.image} alt={`${car.make} ${car.model}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarListings;





