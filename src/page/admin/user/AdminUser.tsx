import React from "react";
import DashboardHeader from "../../../components/header/DashboardHeader";
import UserTable from "./UserTable";

const AdminUser = () => {

  return (
    <>
      <DashboardHeader navigationLink={["User"]} />
      <UserTable />
    </>
  );
};

export default AdminUser;
