import React from 'react'

const AdminHeader = () => {
  return (
  <>
  <title>Flow Labs Admin</title>
    <div className='bg-gray-800 border-b-2 border-b-gray-700 flex justify-between'>
      <div><h1 className='font-extrabold text-slate-300 p-4 bg-slate-700'>FLOW LABS</h1></div>
      <div><h1 className=' text-slate-300 p-4 cursor-pointer'>Logout</h1></div>
    </div>
    </>
  )
}

export default AdminHeader
