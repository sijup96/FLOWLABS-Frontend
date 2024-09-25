import {Route, Routes } from 'react-router-dom'
import CompanyRoutes from './CompanyRoutes'
import AdminRoutes from './AdminRoutes'
import BrowseRoutes from './BrowseRoutes'
const AppRoutes = () => {
    return(
    <Routes>
        <Route path='/company' element={<CompanyRoutes/>}/>
        <Route path='/admin/*' element={<AdminRoutes/>}/>
        <Route path='/*' element={<BrowseRoutes/>}/>
    </Routes>
    )
}

export default AppRoutes