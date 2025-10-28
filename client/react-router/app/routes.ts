import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // Public routes
  route("login", "routes/auth/login.tsx"),
  
  // Authenticated routes
  layout("routes/layouts/auth-layout.tsx", [
    index("routes/dashboard/index.tsx"),
    route("employees", "routes/employees/employees.tsx"),
    route("payroll", "routes/payroll/payroll.tsx"),

    // Settings routes (accessible to all authenticated users)
    route("settings", "routes/settings/settings.tsx"),
    route("settings/positions", "routes/settings/positions/positions.tsx"),
    route("settings/departments", "routes/settings/departments/departments.tsx"),

    // Admin-only routes (protected by AdminRoute component inside each)
    route("admin/dashboard", "routes/dashboard/admin-dashboard.tsx"),
  ]),
  
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
