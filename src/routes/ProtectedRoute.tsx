import { Children } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import AdminLandingLayout from "../layout/admin/AdminLandingLayout";
import AdminLandingPage from "../page/admin/AdminLandingPage";

const ProtectedRoute = () => {
  let element = useRoutes([
    {
      path: "dashboard",
      element: <AdminLandingLayout />,
      children: [{ path: "", element: <AdminLandingPage />, index: true }],
    },
  ]);

  return element;
};

export default ProtectedRoute;
