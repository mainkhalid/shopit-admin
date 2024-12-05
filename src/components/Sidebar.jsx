import React from 'react'
import { Link } from 'react-router-dom'
import add_product_icon from '../assets/add_product.png'
import list_product_icon from '../assets/list_product_icon.png'
const Sidebar = () => {
  return (
    <div className='flex flex-col gap-4'>
        {/*add product */}
        <Link to={'/addproduct'}>
            <div className='flex gap-2'>
                <img className='w-[30px]' src={add_product_icon} alt="" />
                <p>Add product</p>
            </div>
        </Link>

        {/* list products*/}
        <Link to={'/listproduct'}>
            <div className='flex gap-2'>
                <img className='w-[30px]' src={list_product_icon} alt="" />
                <p>product list</p>
            </div>
        </Link>
    </div>
  ) 
}

export default Sidebar