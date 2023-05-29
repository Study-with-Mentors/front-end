import React from "react";
import MainHeader from "../../components/header/MainHeader";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <div>
      <MainHeader isLogined={false} />
      <Outlet />
    </div>
  );
};

export default LandingLayout;
