import { Outlet } from "react-router-dom";
import LeftSideBar from "../../components/sidebar/LeftSideBar";
import styled from "./AdminLandingLayout.module.scss";

const AdminLandingLayout = () => {
  return (
    <div className={styled["container"]}>
      <LeftSideBar />
      <div style={{ width: '100%' }}      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLandingLayout;
