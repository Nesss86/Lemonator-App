import React, { useState } from "react";
import "../styles/SearchBar.scss";

const SearchBar = ({ cars, setFilteredCars }) => {
  const [filters, setFilters] = useState({
    city: "",
    make: "",
    model: "",
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const filteredResults = cars.filter((car) => {
      return (
        (filters.city === "" || car.city.toLowerCase().includes(filters.city.toLowerCase())) &&
        (filters.make === "" || car.make.toLowerCase().includes(filters.make.toLowerCase())) &&
        (filters.model === "" || car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
        (filters.minYear === "" || car.year >= Number(filters.minYear)) &&
        (filters.maxYear === "" || car.year <= Number(filters.maxYear)) &&
        (filters.minPrice === "" || car.price_cents >= Number(filters.minPrice) * 100) && // Convert to cents
        (filters.maxPrice === "" || car.price_cents <= Number(filters.maxPrice) * 100) && // Convert to cents
        (filters.minMileage === "" || car.mileage >= Number(filters.minMileage)) &&
        (filters.maxMileage === "" || car.mileage <= Number(filters.maxMileage))
      );
    });

    setFilteredCars(filteredResults); // Update listings in LandingPage
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Find Your Perfect Car</h2>
      <div className="search-fields">
        <input type="text" name="city" placeholder="City" className="search-input" onChange={handleChange} />
        <input type="text" name="make" placeholder="Make" className="search-input" onChange={handleChange} />
        <input type="text" name="model" placeholder="Model" className="search-input" onChange={handleChange} />
        <div className="range-container">
          <input type="number" name="minYear" placeholder="Min Year" className="range-input" onChange={handleChange} />
          <input type="number" name="maxYear" placeholder="Max Year" className="range-input" onChange={handleChange} />
        </div>
        <div className="range-container">
          <input type="number" name="minPrice" placeholder="Min Price" className="range-input" onChange={handleChange} />
          <input type="number" name="maxPrice" placeholder="Max Price" className="range-input" onChange={handleChange} />
        </div>
        <div className="range-container">
          <input type="number" name="minMileage" placeholder="Min Mileage" className="range-input" onChange={handleChange} />
          <input type="number" name="maxMileage" placeholder="Max Mileage" className="range-input" onChange={handleChange} />
        </div>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
