import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';

const Admin = () => {
  return (
    <div className='flex flex-row h-screen'>
      {/* Sidebar */}
      <div className="w-64 bg-gray-700 text-white p-4  ">
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
