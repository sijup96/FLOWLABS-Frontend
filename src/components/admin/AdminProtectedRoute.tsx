// import React, { ReactNode } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// interface AdminProtectedRouteProps{
//     children:ReactNode;
//     isAuthenticated:boolean;
// }
// const AdminProtectedRoute:React.FC<AdminProtectedRouteProps>=()=>{
// return isAuthenticated?(<section>{<Outlet/>}</section>):(<Navigate to={'/admin/login'}/>)
// }
// export default AdminProtectedRoute