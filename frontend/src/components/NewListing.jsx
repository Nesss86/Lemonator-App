import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
// import "../NewListing.scss";


  const NewListing = ({ }) => {
    const navigate = useNavigate(); // Allows redirecting after submission

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
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Create a New Car Listing</h2>
  
        <label className="block mb-2">
          Category:
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2">
            <option value="">Select Category</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
          </select>
        </label>

        <label className="block mb-2">
          User ID:
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} className="w-full border p-2" />
        </label>
  
        <label className="block mb-2">
          Make:
          <input type="text" name="make" value={formData.make} onChange={handleChange} className="w-full border p-2" />
        </label>
  
        <label className="block mb-2">
          Model:
          <input type="text" name="model" value={formData.model} onChange={handleChange} className="w-full border p-2" />
        </label>
  
        <label className="block mb-2">
          Year:
          <input type="number" name="year" value={formData.year} onChange={handleChange} className="w-full border p-2" />
        </label>
  
        <label className="block mb-2">
          Price :
          <input
            type="number"
            name="price_cents"
            value={formData.price_cents / 100} // Show value in dollars
            onChange={handleChange}
            className="w-full border p-2"
            step="0.01" // Allow decimal input
          />
        </label>
  
        <label className="block mb-2">
          Color:
          <input type="text" name="color" value={formData.color} onChange={handleChange} className="w-full border p-2" />
        </label>
  
        <label className="block mb-2">
          Mileage:
          <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} className="w-full border p-2" />
        </label>
  
        <label className="block mb-2">
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border p-2" />
        </label>
  
        <label className="block mb-2">
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2" rows="3"></textarea>
        </label>
  
        <label className="block mb-2">
          Upload Images:
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full border p-2" />
        </label>
  
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
          Submit Listing
        </button>
      </form>
    );
  };
  
  export default NewListing;