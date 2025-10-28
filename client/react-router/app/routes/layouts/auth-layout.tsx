import { Outlet } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import Sidebar from "~/components/layouts/sidebar";
import Navbar from "~/components/layouts/navbar";

function AuthLayout() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <Sidebar />
        
        <main className="flex-1 overflow-auto">
          <Navbar/>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

export default AuthLayout;