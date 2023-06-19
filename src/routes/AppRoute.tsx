import CommonRoute from "./CommonRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoute = () => {
  const role = localStorage.getItem("role");
  if (role && role == "ADMIN") {
    return <ProtectedRoute />;
  }
  return <CommonRoute />;
};

export default AppRoute;
