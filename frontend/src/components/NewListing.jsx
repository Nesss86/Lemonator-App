import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/NewListing.scss";

const NewListing = () => {
  const navigate = useNavigate();

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
      if (name === "price_cents") {
        return { ...prev, [name]: Math.round(parseFloat(value) * 100) || "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Avoid adding duplicate files (e.g., when the same file is selected again)
    setFormData((prev) => {
      const uniqueFiles = [
        ...new Set([...prev.images, ...files].map((file) => file.name)),
      ];
      return { ...prev, images: uniqueFiles.map((fileName) => files.find(file => file.name === fileName)) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        // Add images to the FormData only once
        value.forEach((file) => {
          if (file instanceof File) {
            data.append("car_listing[images][]", file);
          }
        });
      } else {
        data.append(`car_listing[${key}]`, value);
      }
    });

    try {
      const response = await api.post("/car_listings", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Listing created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Error creating listing:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-listing__form">
      <h2 className="create-listing__title">Create a New Car Listing</h2>

      <label className="create-listing__label">
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="create-listing__input"
        >
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
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          className="create-listing__input"
        />
      </label>

      <label className="create-listing__label">
        Make:
        <input
          type="text"
          name="make"
          value={formData.make}
          onChange={handleChange}
          className="create-listing__input"
        />
      </label>

      <label className="create-listing__label">
        Model:
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="create-listing__input"
        />
      </label>

      <label className="create-listing__label">
        Year:
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="create-listing__input"
        />
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
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="create-listing__input"
        />
      </label>

      <label className="create-listing__label">
        Mileage:
        <input
          type="number"
          name="mileage"
          value={formData.mileage}
          onChange={handleChange}
          className="create-listing__input"
        />
      </label>

      <label className="create-listing__label">
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="create-listing__input"
        />
      </label>

      <label className="create-listing__label">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="create-listing__input"
          rows="3"
        ></textarea>
      </label>

      <label className="create-listing__label">
        Upload Images:
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="create-listing__input"
        />
      </label>

      <button type="submit" className="create-listing__button">
        Submit Listing
      </button>
    </form>
  );
};

export default NewListing;
