import { Route, Routes } from "react-router-dom";
import { CityPage } from "../Pages/CityPage";
import { PortPage } from "../Pages/PortPage";
import { RequireAuth } from "../hoc";
import { DashboardPage } from "../Pages/DashboardPage";
import { LoginPage } from "../Pages/LoginPage";
import { FobPage } from "../Pages/FobPage";
import { CalcPage } from "../Pages/CalcPage";

export const RouteComponents = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      >
        <Route path="" element={<CityPage />} />
        <Route path="port" element={<PortPage />} />
        <Route path="fob" element={<FobPage />} />
        <Route path="calculate" element={<CalcPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
};
