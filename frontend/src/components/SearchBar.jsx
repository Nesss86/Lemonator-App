import React, { useState } from "react";
import "../styles/SearchBar.scss";

const SearchBar = () => {
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <div className="search-container">
      <h2 className="search-title">Find Your Perfect Car</h2>
      <div className="search-fields">
        <input type="text" placeholder="Location" className="search-input" />
        <input type="text" placeholder="Make" className="search-input" />
        <input type="text" placeholder="Model" className="search-input" />
        <div className="range-container">
          <input
            type="number"
            placeholder="Min Year"
            className="range-input"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Year"
            className="range-input"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
          />
        </div>
        <div className="range-container">
          <input
            type="number"
            placeholder="Min Price"
            className="range-input"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="range-input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button className="search-button">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;