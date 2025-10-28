import { SidebarTrigger } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import { useLogout, useAuth } from "~/hooks/useAuth";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
      <SidebarTrigger />
      <h1 className="text-lg font-semibold">Payroll Tracker</h1>
      
      <div className="ml-auto flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{user?.name}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;