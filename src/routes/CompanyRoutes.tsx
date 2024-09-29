import CompanyFirstLogin from '@/screens/company/CompanyFirstLogin'
import CompanyHome from '@/screens/company/CompanyHome'
import CompanyLogin from '@/screens/company/CompanyLogin'
import { Route, Routes } from 'react-router-dom'

const CompanyRoutes = () => {
  return (
<Routes>
  <Route path='/login' element={<CompanyLogin/>}/>
  <Route path='/home' element={<CompanyHome/>}/>
  <Route path='/isFirstTime' element={<CompanyFirstLogin/>}/>
</Routes>
  )
}

export default CompanyRoutes
