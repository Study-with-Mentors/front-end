import React from "react";
import MainHeader from "../../components/header/MainHeader";
import { Outlet } from "react-router-dom";
import MainFooter from "../../components/footer/MainFooter";

const LoginedLayout = () => {
  return (
    <div>
      <MainHeader isLogined={true} />
      <Outlet />
      <MainFooter />
    </div>
  );
};

export default LoginedLayout;
