import React from "react";
import MainHeader from "../../components/header/MainHeader";
import { Outlet } from "react-router-dom";
import MainFooter from "../../components/footer/MainFooter";

const LandingLayout = () => {
  return (
    <div>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </div>
  );
};

export default LandingLayout;
