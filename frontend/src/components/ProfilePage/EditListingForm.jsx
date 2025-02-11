import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/EditListingForm.scss";

const EditListingForm = ({ cars, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingListing = cars.find((car) => car.id.toString() === id);

  const [formData, setFormData] = useState({
    id: "",
    user_id: user?.id || "",
    category: "",
    make: "",
    model: "",
    year: "",
    price_cents: "",
    color: "",
    mileage: "",
    city: "",
    description: "",
    images: [], // Store both new and existing images
  });

  useEffect(() => {
    if (existingListing) {
      setFormData((prev) => ({
        ...prev,
        id: existingListing.id,
        user_id: user?.id || existingListing.user_id,
        category: existingListing.category,
        make: existingListing.make,
        model: existingListing.model,
        year: existingListing.year,
        price_cents: existingListing.price_cents / 100,
        color: existingListing.color,
        mileage: existingListing.mileage,
        city: existingListing.city,
        description: existingListing.description,
        images: existingListing.images || [],
      }));
    }
  }, [existingListing, user]); // Include `user` as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price_cents" ? parseFloat(value) || "" : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files], // Keep old images and add new ones
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("car_listing[user_id]", formData.user_id);
    form.append("car_listing[category]", formData.category);
    form.append("car_listing[make]", formData.make);
    form.append("car_listing[model]", formData.model);
    form.append("car_listing[year]", formData.year);
    form.append("car_listing[price_cents]", Math.round(formData.price_cents * 100)); // Convert dollars to cents
    form.append("car_listing[color]", formData.color);
    form.append("car_listing[mileage]", formData.mileage);
    form.append("car_listing[city]", formData.city);
    form.append("car_listing[description]", formData.description);

    // Append only new images (files)
    formData.images.forEach((file) => {
      if (typeof file !== "string") {
        form.append("car_listing[images][]", file);
      }
    });

    try {
      const response = await api.put(`/car_listings/${formData.id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Listing updated successfully!");
        navigate("/my-listings");
      }
    } catch (error) {
      console.error("❌ Error updating listing:", error);
      alert(`Error: ${error.response?.data?.errors?.join(", ") || "Something went wrong"}`);
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
        Price ($):
        <input type="number" name="price_cents" value={formData.price_cents} onChange={handleChange} className="create-listing__input" step="0.01" />
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

      <div className="image-preview">
        <p>Current Images:</p>
        <div className="image-grid">
          {formData.images.map((img, index) => (
            <div key={index} className="image-container">
              <img src={typeof img === "string" ? img : URL.createObjectURL(img)} alt="Car" className="preview-image" />
              <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <label className="create-listing__label">
        Upload New Images:
        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="create-listing__input" />
      </label>

      <div className="button-group">
        <button type="submit" className="create-listing__button">Save Changes</button>
        <button type="button" className="cancel-button" onClick={() => navigate("/my-listings")}>Cancel</button>
      </div>
    </form>
  );
};

export default EditListingForm;
