import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { adminEndpoints } from '@/api/endpoints';

const AdminLogin = () => {
  const navigate=useNavigate()
  const [credential, setCredential] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredential(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(adminEndpoints.login, credential,{withCredentials:true})
      if(response.data.success){
        navigate('/admin')
      }
    } catch (error) {
      setError('Invalid Credentials')
      console.log(error)
    }

  }
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-center text-white mb-6">Admin Login</h2>
        <form className="space-y-6" action="">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={credential.email}
              onInput={handleInput}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={credential.password}
              onInput={handleInput}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <span className='text-red-500 flex justify-center '>{error}</span>
          <div className="flex justify-between items-center">
            <Button className="w-full bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
              onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
