import { useState } from "react";
import DashboardHeader from "../../../components/header/DashboardHeader";
import CourseTable from "./CourseTable";
import CourseTableDetail from "./CourseTableDetail";

const AdminCourse = () => {

  const [id, setId] = useState<string>('')
  const [detail, setDetail] = useState<boolean>(false)

  if (detail) {
    return (
      <>
        <DashboardHeader navigationLink={["Course", "Detail"]} />
        <CourseTableDetail id={id} setId={setId} setDetail={setDetail} />
      </>
    )
  } else {
    return (
      <>
        <DashboardHeader navigationLink={["Course"]} />
        <CourseTable setId={setId} setDetail={setDetail} />
      </>
    )
  }
};

export default AdminCourse;
