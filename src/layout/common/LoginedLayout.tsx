import React from "react";
import MainHeader from "../../components/header/MainHeader";
import { Outlet } from "react-router-dom";

const LoginedLayout = () => {
  return (
    <div>
      <MainHeader isLogined={true} />
      <Outlet />
    </div>
  );
};

export default LoginedLayout;
