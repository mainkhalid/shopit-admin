import React, { useEffect, useState } from 'react';
import removeIcon from '../assets/remove_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/allproducts`);
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Remove a product
  const removeProduct = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/removeproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full m-4 py-4 px-2 bg-white border-2 border-green-200 rounded-lg shadow-md">
      <h1 className="text-lg font-bold mb-4">All Product List</h1>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 font-semibold border-b pb-2 mb-2">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Action</p>
      </div>

      {/* Product List */}
      {allProducts.map((product) => (
        <div key={product.id} className="grid grid-cols-6 gap-4 items-center border-b py-2">
          <img
            src={product.image}
            alt={product.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <p>{product.name}</p>
          <p>Ksh {product.old_price}</p>
          <p>Ksh {product.new_price}</p>
          <p>{product.category}</p>
          <img
            src={removeIcon}
            alt="Remove"
            onClick={() => removeProduct(product.id)}
            className="cursor-pointer h-6 w-6"
          />
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
