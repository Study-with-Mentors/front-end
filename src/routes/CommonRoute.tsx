import CreateClassPage from "../page/common/CreateClassPage";
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
import AdminDashboard from "../page/admin/dashboard/AdminDashboardMain";
import UserList from "../layout/admin/user/Index";
import AdminUser from "../page/admin/user/AdminUser";
import AdminCourse from "../page/admin/course/AdminCourse";
import ClassListTable from "../components/card/ClassListTable";
import ClassDetailPage from "../page/common/ClassDetailPage";
import SignUpVerifyPage from "../page/common/SignUpVerifyPage";
import EditClassDetail from "../page/common/EditClassDetail";
import { JwtPayload } from "../types/Jwt.type";
import { decode } from "../utils/jwt";
import EnrolledListClassPage from "../page/common/EnrolledListClassPage";
const CommonRoute = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  var { rol }: JwtPayload = decode(access_token!);
  const checkRole = rol && rol == "ADMIN";

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
    { path: "signup/verify", element: <SignUpVerifyPage /> },
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
        {
          path: "class",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <EnrolledListClassPage />,
              index: true,
            },
            {
              path: ":id",
              element: <ClassDetailPage />,
            },
            {
              path: "edit/:id",
              element: <EditClassDetail />,
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
          {
            path: "",
            element: <Outlet />,
            children: [{ path: "", element: <AdminDashboard />, index: true }],
          },
          {
            path: "user",
            element: <Outlet />,
            children: [{ path: "", element: <AdminUser />, index: true }],
          },
          {
            path: "course",
            element: <Outlet />,
            children: [{ path: "", element: <AdminCourse />, index: true }],
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
