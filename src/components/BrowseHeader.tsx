import React from 'react'

const BrowseHeader = () => {
  return (
    <div className='flex justify-between items-center text-center p-2'>
        <div className='text-gray-700 font-extrabold'><h1>FLOW LABS</h1></div>
        <div className='flex space-x-5 text-gray-700'><h5>Products</h5><h5>Pricing</h5><h5>About us</h5></div>
        <div><button className='bg-slate-600 text-white p-2  rounded-full border-8'>Get Free Trail</button></div>
    </div>
  )
}

export default BrowseHeader
