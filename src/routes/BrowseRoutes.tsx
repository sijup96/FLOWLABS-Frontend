import Home from '@/screens/browse/Home'
import SignUp from '@/screens/browse/SignUp'
import NotFound from '@/screens/NotFound'
import { Route, Routes } from 'react-router-dom'

const BrowseRoutes = () => {
  return (
<Routes>
  <Route path='/signUp' element={<SignUp/>}/>
  <Route path='/' element={<Home/>}/>
  <Route path='*' element={<NotFound/>}/>

</Routes>
  )
}

export default BrowseRoutes
