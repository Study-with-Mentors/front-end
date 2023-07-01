import DashboardHeader from "../../../components/header/DashboardHeader";
import Charts from "./Charts";
import Stats from "./Stats";

const AdminDashboard = () => {
  return (
    <>
      <DashboardHeader navigationLink={["Dashboard"]} />
      <Stats />
      <Charts />
    </>
  );
};

export default AdminDashboard;
