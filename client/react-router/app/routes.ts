import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  // Public routes
  route("login", "routes/auth/login.tsx"),
  
  // Authenticated routes
  layout("routes/layouts/auth-layout.tsx", [
    index("routes/dashboard/index.tsx"),

    // Employees routes
    ...prefix('employees', [
      index("routes/employees/index.tsx"),
    ]),

    route("payroll", "routes/payroll/payroll.tsx"),

    // Settings routes (accessible to all authenticated users)
    ...prefix("settings", [
      index("routes/settings/index.tsx"),
      route("positions", "routes/settings/positions/index.tsx"),
      route("departments", "routes/settings/departments/index.tsx"),
    ]),

    // Admin-only routes (protected by AdminRoute component inside each)
    route("admin/dashboard", "routes/dashboard/admin-dashboard.tsx"),
  ]),
  
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
