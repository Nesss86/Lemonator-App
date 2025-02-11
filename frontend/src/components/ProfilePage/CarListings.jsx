import React from 'react';
import "../../styles/CarListings.scss";
import { Link } from "react-router-dom";
import api from "../../api/api"; // Import the API helper


function CarListings({ listings, setListings }) {
  if (!listings || listings.length === 0) {
    return <p>No car listings available.</p>;
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if(!confirmDelete) return;

    try {
      await api.delete(`/car_listings/${id}`); // Use API helper
      setListings((prevListings) => prevListings.filter((car) => car.id !== id));
      alert("Listing deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.error || "Failed to delete listing");
    }
  };

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
              <div className='button-container'>
              <button className="car-button">
                <Link to={`/edit-listing/${car.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  Edit Listing
                </Link>
            </button>
              <button className="car-button" onClick={() => handleDelete(car.id)}>Delete Listing</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarListings;








