import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Building2,
  Briefcase,
  Users,
  DollarSign,
  Calendar,
  Settings as SettingsIcon,
  Shield,
  Bell,
} from "lucide-react";

const settingsCategories = [
  {
    title: "Departments",
    description: "Manage organizational departments and structures",
    icon: Building2,
    href: "/settings/departments",
  },
  {
    title: "Positions",
    description: "Configure job positions and roles",
    icon: Briefcase,
    href: "/settings/positions",
  },
  {
    title: "Employees",
    description: "Manage employee information and records",
    icon: Users,
    href: "/settings/employees",
  },
  {
    title: "Payroll Configuration",
    description: "Set up payroll rules, taxes, and deductions",
    icon: DollarSign,
    href: "/settings/payroll",
  },
  {
    title: "Leave Management",
    description: "Configure leave types and policies",
    icon: Calendar,
    href: "/settings/leave",
  },
  {
    title: "System Settings",
    description: "General system configuration and preferences",
    icon: SettingsIcon,
    href: "/settings/system",
  },
  {
    title: "Permissions & Roles",
    description: "Manage user roles and access control",
    icon: Shield,
    href: "/settings/permissions",
  },
  {
    title: "Notifications",
    description: "Configure notification preferences and alerts",
    icon: Bell,
    href: "/settings/notifications",
  },
];

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your payroll system configuration and preferences
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {settingsCategories.map((category) => {
          const Icon = category.icon;
          return (
            <a key={category.title} href={category.href}>
              <Card className="transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="mt-3">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;