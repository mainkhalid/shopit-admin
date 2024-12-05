import React, { useState, useCallback } from 'react';
import uploadPlaceholder from '../assets/upload.png';

const AddProduct = () => {
  const [imageFile, setImageFile] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    category: "ex-uk",
    new_price: "",
    old_price: "",
  });

  const handleInputChange = useCallback(
    (e) => setProductData({ ...productData, [e.target.name]: e.target.value }),
    [productData]
  );

  const handleImageChange = useCallback((e) => setImageFile(e.target.files[0]), []);

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('product', imageFile);

    try {
      const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadResponse.json();
      if (uploadResult.success) {
        const newProduct = { ...productData, image: uploadResult.image_url };

        const addProductResponse = await fetch(`${import.meta.env.VITE_API_URL}/addproduct`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });

        const addResult = await addProductResponse.json();
        alert(addResult.success ? "Product added successfully" : "Failed to add product");
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6">Add Product</h1>
      
      {/* Product Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
        />
      </div>

      {/* Prices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Old Price</label>
          <input
            type="number"
            name="old_price"
            value={productData.old_price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Price</label>
          <input
            type="number"
            name="new_price"
            value={productData.new_price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
        >
          <option value="ex-uk">Ex-UK</option>
          <option value="new">New</option>
          <option value="student">Student</option>
        </select>
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Product Image
        </label>
        <div className="relative flex items-center justify-center w-32 h-32 border border-dashed border-gray-300 rounded-lg overflow-hidden">
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : uploadPlaceholder}
            alt="Upload Preview"
            className="object-cover w-full h-full"
          />
        </div>
        <input
          type="file"
          id="image-upload"
          onChange={handleImageChange}
          hidden
        />
        <label
          htmlFor="image-upload"
          className="mt-2 inline-block text-green-600 font-semibold cursor-pointer"
        >
          Choose Image
        </label>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleAddProduct}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
