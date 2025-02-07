import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../styles/ListingItemDetails.scss";

const ListingItemDetails = ({ cars }) => {
  const { id } = useParams();
  const car = cars.find((car) => car.id === parseInt(id));

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (car && car.images?.length > 0) {
      setMainImage(car.images[0]); // Set first image as the main image
    }
  }, [car]);

  if (!car) {
    return <div>Car not found.</div>;
  }

  const formatPrice = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  return (
    <div className='listing-item__details'>
      <div className="listing-item__left">
        <img 
          className="listing-item__main-image" 
          src={mainImage || "https://via.placeholder.com/300"} 
          alt={`${car.make} ${car.model}`} 
        />
        
        <div className="listing-item__thumbnails">
          {car.images && car.images.map((img, index) => (
            <img
              key={index}
              src={img} // Fallback if URL is undefined
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="listing-item__right">
        <h1 className='listing-item__title'>{car.year} {car.make} {car.model}</h1>
        <div className="listing-item__info">
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Price:</strong> {formatPrice(car.price_cents)}</p>
          <p><strong>Mileage:</strong> {car.mileage} km</p>
          <p><strong>Colour:</strong> {car.color}</p>
          <p><strong>Location:</strong> {car.city}</p>
        </div>
        <div className="listing-item__description">
          <h2>Description</h2>
          <p>{car.description || "No description available."}</p>
        </div>
        <button className="contact-seller">Contact Seller</button>
      </div>
    </div>
  );
};

export default ListingItemDetails;
