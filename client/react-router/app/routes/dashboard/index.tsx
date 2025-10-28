import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/hooks/useAuth";

import EmployeeDashboard from "./employee-dashboard";
import AdminDashboard from "./admin-dashboard";

export default function DashboardIndex() {
  const { user } = useAuth();
  return (user?.role === "admin") ? <AdminDashboard /> : <EmployeeDashboard />;
}
