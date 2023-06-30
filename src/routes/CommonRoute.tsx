import { useEffect } from "react";
import { Outlet, useNavigate, useRoutes } from "react-router-dom";
import SignUpPage from "../page/common/SignUpPage";
import LandingLayout from "../layout/common/LandingLayout";
import LandingPage from "../page/common/LandingPage";
import CoursePage from "../page/common/CoursePage";
import MentorDetail from "../page/common/MentorDetail";
import CreateCoursePage from "../page/common/CreateCoursePage";
import SearchCourseResult from "../page/common/SearchCourseResult";
import EditCoursePage from "../page/common/EditCoursePage";
import ProfilePage from "../page/common/ProfilePage";
import LoginPage from "../page/common/LoginPage";
import HomeLayout from "../layout/common/HomeLayout";
import LessonCalendarPage from "../page/common/LessonCalendarPage";
import DashBoardPage from "../page/common/DashBoardPage";
import CourseListPage from "../page/common/CourseListPage";
import NotFoundPage from "../page/common/404Page";
import ProtectedRoute from "./ProtectedRoute";
import AdminLandingLayout from "../layout/admin/AdminLandingLayout";
import AdminLandingPage from "../page/admin/AdminLandingPage";
import UserList from "../layout/admin/user/Index";
import CreateClassPage from "../page/common/CreateClassPage";
const CommonRoute = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const checkRole = role && role == "ADMIN";

  useEffect(() => {}, []);

  let element = useRoutes([
    {
      path: "",
      element: <LandingLayout />,
      children: [
        {
          path: "",
          element: <LandingPage />,
          index: true,
        },
        {
          path: "course/search",
          element: <SearchCourseResult />,
        },
        {
          path: "course/:id",
          element: <CoursePage />,
        },
        {
          path: "mentor/:id",
          element: <MentorDetail />,
        },
      ],
    },
    {
      path: "auth",
      element: <Outlet />,
      children: [
        { path: "", element: <LoginPage />, index: true },
        { path: "signup", element: <SignUpPage /> },
      ],
    },
    {
      path: "home",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <DashBoardPage />,
          index: true,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "schedule",
          element: <LessonCalendarPage />,
        },
        {
          path: "course",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <CourseListPage />,
              index: true,
            },
            {
              path: "edit/:id",
              element: <EditCoursePage />,
            },
            {
              path: "create-class/:id",
              element: <CreateClassPage />,
            },
          ],
        },
      ],
    },
    {
      path: "course/create",
      element: <CreateCoursePage />,
    },
    {
      ...(checkRole && {
        path: "/admin",
        element: <AdminLandingLayout />,
        children: [
          { path: "", element: <AdminLandingPage />, index: true },
          {
            path: "user",
            element: <Outlet />,
            children: [{ path: "", element: <UserList />, index: true }],
          },
        ],
      }),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },

    // {
    //   path: "*",
    //   element: <>Xin cho vo iu 1 follow ins/tran_nhi_yen &lt; 3</>,
    // },
  ]);

  return element;
};

export default CommonRoute;
