import React from "react";
import LeftSideBar from "../../components/sidebar/LeftSideBar";
import { Outlet } from "react-router-dom";
import styled from "./AdminLandingLayout.module.scss";
import DashboardHeader from "../../components/header/DashboardHeader";

const AdminLandingLayout = () => {
  return (
    <div className={styled["container"]}>
      <LeftSideBar />
      <div
        style={{ width: '100%', backgroundColor: "#f2f4f7" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLandingLayout;
