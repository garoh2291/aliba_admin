import { Outlet } from "react-router-dom";
import { Header } from "../../Layout/Header";
import "./styles.css";
export const DashboardPage = () => {
  return (
    <div className="dashboard_wrapper">
      <Header />
      <div style={{ flex: "1", padding: "10px 20px" }}>
        <Outlet />
      </div>
    </div>
  );
};
