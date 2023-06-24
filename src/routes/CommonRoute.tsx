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
import AdminLandingPageDashboard from "../page/admin/AdminLandingPageDashboard";
import UserList from "../layout/admin/user/Index";
import AdminUser from "../page/admin/AdminUser";
import AdminCourse from "../page/admin/AdminCourse";
const CommonRoute = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const checkRole = role && role == "ADMIN";

  useEffect(() => {}, []);

  let element = useRoutes([
    {
      path: "landing",
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
      ],
    },
    {
      path: "signup",
      element: <SignUpPage />,
    },
    {
      path: "signin",
      element: <LoginPage />,
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
          path: "courses",
          element: <CourseListPage />,
        },
        {
          path: "mentor/:id",
          element: (
            <MentorDetail
            // // email="emai_@gmail.com"
            // // id="1"
            // // location="HCM City"
            // // mentorName="Evada Kevadra"
            // // skillList={[
            // //   "UI/UX",
            // //   "Back End",
            // //   "English Grammar",
            // //   "Preschool education",
            // // ]}
            // // workPosition="Senior Teacher in FPT University"
            // // decription=" I think I am a nice person though have negligible weaknesses,
            // // have a good amount of likeable good qualities too. I am sincere and responsible.
            // //  I am not a very intelligent student but sure I am dynamic as I am capable of managing and handling serious and difficult situations easily and finish all tasks well.
            // // "
            // // mentorBackgrounds={[
            // //   {
            // //     image:
            // //       "https://cdn.dribbble.com/users/5947371/screenshots/16688215/media/cdb4d7aacb2c07079caf8953a11f80d6.jpg?compress=1&resize=1000x750&vertical=top",
            // //     name: "University of Melbourn",
            // //     position: "Master degree, Foreign Language",
            // //     time: "Sep 2007 - Oct 2022",
            // //   },
            // //   {
            // //     image:
            // //       "https://cdn.dribbble.com/users/5947371/screenshots/16688215/media/cdb4d7aacb2c07079caf8953a11f80d6.jpg?compress=1&resize=1000x750&vertical=top",
            // //     name: "University of Melbourn",
            // //     position: "Master degree, Foreign Language",
            // //     time: "Sep 2007 - Oct 2022",
            // //   },
            // ]}
            />
          ),
        },

        {
          path: "course/edit/:id",
          element: <EditCoursePage />,
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
            children: [{ path: "", element: <AdminLandingPageDashboard />, index: true }],
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
