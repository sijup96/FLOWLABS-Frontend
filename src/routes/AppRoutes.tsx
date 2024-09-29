import {Route, Routes } from 'react-router-dom'
import CompanyRoutes from './CompanyRoutes'
import AdminRoutes from './AdminRoutes'
import BrowseRoutes from './BrowseRoutes'
import ErrorBoundary from '@/components/ErrorBoundary'
const AppRoutes = () => {
    return(
        <ErrorBoundary>
    <Routes>
        <Route path='/c/:domainName/*' element={<CompanyRoutes/>}/>
        <Route path='/admin/*' element={<AdminRoutes/>}/>
        <Route path='/*' element={<BrowseRoutes/>}/>
    </Routes>
    </ErrorBoundary>
    )
}

export default AppRoutes