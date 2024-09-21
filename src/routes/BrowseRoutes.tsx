import Home from '@/screens/browse/Home'
import SignUp from '@/screens/browse/SignUp'
import { Route, Routes } from 'react-router-dom'

const BrowseRoutes = () => {
  return (
<Routes>
  <Route path='/signUp' element={<SignUp/>}/>
  <Route path='/' element={<Home/>}/>
</Routes>
  )
}

export default BrowseRoutes
