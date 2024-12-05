import React from 'react'
import {assets }from '../assets/assets'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center bg-gray-600 position-fixed top-0 left-0 right-0'>
        <div className='w-[80%] flex justify-between mx-[60px]'>
        <img className='w-22 h-16' src={assets.logo} alt="" /> {/*navlogo */}
        <img className='w-18 h-17' src={assets.profile} alt="" />{/*navprofilelogo */}
        </div>
    </div>
  )
}

export default Navbar