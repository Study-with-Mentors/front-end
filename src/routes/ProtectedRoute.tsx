import { Children } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import AdminLandingLayout from "../layout/admin/AdminLandingLayout";
import AdminLandingPage from "../page/admin/AdminLandingPage";
import UserList from "../layout/admin/user/Index";
import NotFoundPage from "../page/common/404Page";

const ProtectedRoute = () => {
  let element = useRoutes([
    {
      path: "dashboard",
      element: <AdminLandingLayout />,
      children: [
        { path: "", element: <AdminLandingPage />, index: true },
        {
          path: "user",
          element: <Outlet />,
          children: [{ path: "", element: <UserList />, index: true }],
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return element;
};

export default ProtectedRoute;
