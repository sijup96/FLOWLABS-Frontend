import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from '../screens/browse/Home'
import Pricing from '../screens/browse/Pricing'
import SignUp from '../screens/browse/SignUp'
const AppRoutes = () => {
    return(
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/price' element={<Pricing/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
    </Routes>
    )
}

export default AppRoutes