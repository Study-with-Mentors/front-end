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
          element: <SettingPage />,
          index: true,
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
  ]);

  return element;
};

export default CommonRoute;
