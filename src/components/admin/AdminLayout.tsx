import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
    return (
        <>
            <AdminHeader />
            <div className="flex">
            <AdminSidebar />
            <main><Outlet /></main>
            </div>
        </>)
}

export default AdminLayout
