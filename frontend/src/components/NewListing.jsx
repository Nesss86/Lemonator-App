import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/NewListing.scss"


  const NewListing = ({ }) => {
    const navigate = useNavigate(); // Allows redirecting after submission

    // using useState Hook for setting formData 
    const [formData, setFormData] = useState({
      user_id: "",
      category: "",
      make: "",
      model: "",
      year: "",
      price_cents: "",
      color: "",
      mileage: "",
      city: "",
      description: "",
      images: [],
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
    
      setFormData((prev) => {
        // Here we have multiplied by 100 to store dollar price in cents in database
        if (name === "price_cents") {
          const priceInCents = Math.round(parseFloat(value) * 100) || "";
          return { ...prev, [name]: priceInCents };
        }
        return { ...prev, [name]: value };
      });
    };
  
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: files }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      
      try {
        const response = await api.post("/car_listings", formData, {
          headers: { "Content-Type": "application/json" },
        });
    
        if (response.status === 201) {
          alert("Listing created successfully!");
          navigate("/"); // Redirect after successful submission
        }
      } catch (error) {
        console.error("❌ Error creating listing:", error);
    
        if (error.response) {
          console.error("📥 Server Response:", error.response.data);
          console.error("📡 Status Code:", error.response.status);
          alert(`Error: ${error.response.data.errors?.join(", ") || "Something went wrong"}`);
        } else {
          alert("Failed to connect to the server.");
        }
      }
    };
    
  
    return (
      <form onSubmit={handleSubmit} className="create-listing__form">
        <h2 className="create-listing__title">Create a New Car Listing</h2>
  
        <label className="create-listing__label">
          Category:
          <select name="category" value={formData.category} onChange={handleChange} className="create-listing__input">
            <option value="">Select Category</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Pickup">Pickup</option>
            <option value="Coupe">Coupe</option>
            <option value="Electric">Electric</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </label>

        <label className="create-listing__label">
          User ID:
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} className="create-listing__input" />
        </label>
  
        <label className="create-listing__label">
          Make:
          <input type="text" name="make" value={formData.make} onChange={handleChange} className="create-listing__input" />
        </label>
  
        <label className="create-listing__label">
          Model:
          <input type="text" name="model" value={formData.model} onChange={handleChange} className="create-listing__input" />
        </label>
  
        <label className="create-listing__label">
          Year:
          <input type="number" name="year" value={formData.year} onChange={handleChange} className="create-listing__input" />
        </label>
  
        <label className="create-listing__label">
          Price :
          <input
            type="number"
            name="price_cents"
            value={formData.price_cents / 100} // Show value in dollars
            onChange={handleChange}
            className="create-listing__input"
            step="0.01" // Allow decimal input
          />
        </label>
  
        <label className="create-listing__label">
          Color:
          <input type="text" name="color" value={formData.color} onChange={handleChange} className="create-listing__input" />
        </label>
  
        <label className="create-listing__label">
          Mileage:
          <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} className="create-listing__input" />
        </label>
  
        <label className="create-listing__label">
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="create-listing__input" />
        </label>
  
        <label className="create-listing__label">
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} className="create-listing__input" rows="3"></textarea>
        </label>
  
        <label className="create-listing__label">
          Upload Images:
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="create-listing__input" />
        </label>
  
        <button type="submit" className="create-listing__button">
          Submit Listing
        </button>
      </form>
    );
  };
  
  export default NewListing;