import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"; // used useParams hook from react-router-dom
import "../styles/ListingItemDetails.scss";

const ListingItemDetails = ({ cars }) => {
  const { id } = useParams(); // We grab id from url when user click on View details link in ListingListItem using useParams
  const car = cars.find((car) => car.id === parseInt(id));   // Find car by id

  
  const [mainImage, setMainImage] = useState(null); // Initially set to null

  // Update mainImage when car is found
  useEffect(() => {
    if (car && car.images?.length > 0) {
      setMainImage(car.images[0]);
    }
  }, [car]);

  if (!car) {
    return <div>Car not found.</div>; // Handle case where car is not found
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
      {/* Left Section */}
      <div className="listing-item__left">
        <img className="listing-item__main-image" src={mainImage} alt={`${car.make} ${car.model}`} />

        <div className="listing-item__thumbnails">
          {/** Conditional rendering to check if car images exist then map over individual car */}
          {car.images && car.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right Section */}
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