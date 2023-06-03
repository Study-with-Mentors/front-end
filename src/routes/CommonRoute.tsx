import { useEffect } from "react";
import { Outlet, useNavigate, useRoutes } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import SignUpPage from "../page/common/SignUpPage";
import LoginForm from "../components/form/LoginForm";
import SignUpForm from "../components/form/SignUpForm";
import MainIcon from "../assets/main-logo.svg";
import LandingLayout from "../layout/common/LandingLayout";
import SearchCard from "../components/card/SearchCard";
import LandingPage from "../page/common/LandingPage";
import LoginedLayout from "../layout/common/LoginedLayout";
import SettingPage from "../page/common/SettingPage";
import CoursePage from "../page/common/CoursePage";
import MainFooter from "../components/footer/MainFooter";
import MentorDetail from "../page/common/MentorDetail";
import CreateCoursePage from "../page/common/CreateCoursePage";
import SearchCourseResult from "../page/common/SearchCourseResult";
const CommonRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  let element = useRoutes([
    {
      path: "home",
      element: <LoginedLayout />,
      children: [
        {
          path: "",
          element: <div>Home but chua thiet ke</div>,
          index: true,
        },
        {
          path: "setting",
          element: <SettingPage />,
        },
        {
          path: "mentor/:id",
          element: (
            <MentorDetail
              email="emai_@gmail.com"
              id="1"
              location="HCM City"
              mentorName="Evada Kevadra"
              skillList={[
                "UI/UX",
                "Back End",
                "English Grammar",
                "Preschool education",
              ]}
              workPosition="Senior Teacher in FPT University"
              decription=" I think I am a nice person though have negligible weaknesses, 
              have a good amount of likeable good qualities too. I am sincere and responsible.
               I am not a very intelligent student but sure I am dynamic as I am capable of managing and handling serious and difficult situations easily and finish all tasks well.
              "
              mentorBackgrounds={[
                {
                  image:
                    "https://cdn.dribbble.com/users/5947371/screenshots/16688215/media/cdb4d7aacb2c07079caf8953a11f80d6.jpg?compress=1&resize=1000x750&vertical=top",
                  name: "University of Melbourn",
                  position: "Master degree, Foreign Language",
                  time: "Sep 2007 - Oct 2022",
                },
                {
                  image:
                    "https://cdn.dribbble.com/users/5947371/screenshots/16688215/media/cdb4d7aacb2c07079caf8953a11f80d6.jpg?compress=1&resize=1000x750&vertical=top",
                  name: "University of Melbourn",
                  position: "Master degree, Foreign Language",
                  time: "Sep 2007 - Oct 2022",
                },
              ]}
            />
          ),
        },
        {
          path: "course/:id",
          element: (
            <CoursePage
              courseName="Artificial Intelligence & Machine Learning"
              createBy="Loser2Lover"
              courseFee="200"
              discount="220"
            />
          ),
        },
        {
          path: "course/create",
          element: <CreateCoursePage />,
        },
        {
          path: "search/course",
          element: <SearchCourseResult />,
        },
      ],
    },
    {
      path: "landing",
      element: <LandingLayout />,
      children: [
        {
          path: "",
          element: <LandingPage />,
          index: true,
        },
      ],
    },
    {
      path: "SignUp",
      element: <SignUpPage />,
    },
    {
      path: "search",
      element: <SearchCard />,
    },
    {
      path: "footer",
      element: <MainFooter />,
    },
    {
      path: "*",
      element: <>vo / sthing pls</>,
    },

    // {
    //   path: "*",
    //   element: <>Xin cho vo iu 1 follow ins/tran_nhi_yen &lt; 3</>,
    // },
  ]);

  return element;
};

export default CommonRoute;
