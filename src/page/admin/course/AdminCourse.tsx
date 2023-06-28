import React from "react";
import DashboardHeader from "../../../components/header/DashboardHeader";
import CourseTable from "./CourseTable";

const AdminCourse = () => {
  return (
    <>
      <DashboardHeader navigationLink={["Course"]} />
      <CourseTable />
    </>
  );
};

export default AdminCourse;
