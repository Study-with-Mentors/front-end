import React from "react";
import HomeHeader from "../../components/header/HomeHeader";
import HomeSideBar from "../../components/sidebar/HomeSideBar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <HomeSideBar />
        </div>
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            marginLeft: "360px",
          }}
        >
          <HomeHeader />
          <div style={{ flex: 1, backgroundColor: "#f2f4f7" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
