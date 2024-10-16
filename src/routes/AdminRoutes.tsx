// import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import AdminLayout from "@/components/admin/AdminLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AdminLogin from "@/screens/admin/AdminLogin";
import NotFound from "@/screens/NotFound";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AdminDashboard = lazy(() => import("@/screens/admin/AdminDashboard"));
const AdminRequests = lazy(() => import("@/screens/admin/AdminRequests"));
const AdminRoutes = () => {
  
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route element={<AdminLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          path="/requests"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminRequests />
            </Suspense>
          }
        />
        <Route path="/users" element={<AdminRequests />} />
      </Route>
      <Route path='*' element={<NotFound/>}/>

    </Routes>
  );
};

export default AdminRoutes;
