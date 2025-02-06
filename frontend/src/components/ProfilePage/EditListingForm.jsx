import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/NewListing.scss"


  const EditListingForm = ({ cars }) => {
    const { id } = useParams(); // To get ID from the url
    const navigate = useNavigate(); // Allows redirecting after submission

    const existingListing = cars.find(car => car.id.toString() === id); // Find the listing based on the url id

    // using useState Hook for setting formData 
    const [formData, setFormData] = useState({
      id: "",
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

    useEffect(() => {
      if (existingListing) {
        setFormData({
          id: existingListing.id,
          user_id: existingListing.user_id,
          category: existingListing.category,
          make: existingListing.make,
          model: existingListing.model,
          year: existingListing.year,
          price_cents: existingListing.price_cents,
          color: existingListing.color,
          mileage: existingListing.mileage,
          city: existingListing.city,
          description: existingListing.description,
          images: [], // Keep empty because file inputs can’t be pre-filled
        });
      }
    }, [existingListing]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price_cents" ? Math.round(parseFloat(value) * 100) || "" : value,
      }));
    };
  
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: files }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      
      try {
        const response = await api.put(`/car_listings/${formData.id}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
    
        if (response.status === 200) {
          alert("Listing updated successfully!");
          navigate("/my-listings"); // Redirect after successful submission
        }
      } catch (error) {
        console.error("❌ Error updating listing:", error);
    
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
        <h2 className="create-listing__title">Edit Your Listing</h2>
  
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
  
  export default EditListingForm;