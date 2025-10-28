import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";
import { AdminRoute } from "~/components/auth/AdminRoute";
import { 
  Users, 
  Clock, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  ClipboardCheck,
  UserCheck,
  Briefcase
} from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const pendingLeaves = [
    { id: 1, employee: "John Doe", type: "Vacation Leave", days: 3, date: "Nov 5-7, 2025" },
    { id: 2, employee: "Jane Smith", type: "Sick Leave", days: 1, date: "Nov 2, 2025" },
    { id: 3, employee: "Mike Johnson", type: "Emergency Leave", days: 2, date: "Nov 8-9, 2025" },
  ];

  const pendingAdjustments = [
    { id: 1, employee: "Sarah Williams", type: "Time In", date: "Oct 27, 2025", reason: "Forgot to clock in" },
    { id: 2, employee: "Tom Brown", type: "Time Out", date: "Oct 26, 2025", reason: "System error" },
  ];

  const recentActivities = [
    { id: 1, action: "Leave approved", employee: "Emma Davis", time: "2 hours ago" },
    { id: 2, action: "Adjustment approved", employee: "Alex Turner", time: "5 hours ago" },
    { id: 3, action: "New employee added", employee: "Chris Martin", time: "1 day ago" },
  ];

  return (
    <AdminRoute>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name}! Manage your team and approvals.
          </p>
        </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Present Today
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              87.5% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              3 leaves, 2 adjustments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              On Leave Today
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              4 vacation, 2 sick
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Pending Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Leave Requests
            </CardTitle>
            <CardDescription>
              Approve or deny employee leave requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingLeaves.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{leave.employee}</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.type} • {leave.days} day{leave.days > 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-muted-foreground">{leave.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Requests
            </Button>
          </CardContent>
        </Card>

        {/* Pending Time Adjustments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Time Adjustments
            </CardTitle>
            <CardDescription>
              Review and approve time correction requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingAdjustments.map((adjustment) => (
                <div key={adjustment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{adjustment.employee}</p>
                    <p className="text-sm text-muted-foreground">
                      {adjustment.type} • {adjustment.date}
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      "{adjustment.reason}"
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Adjustments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Department Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                    <AlertCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.employee}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Department Overview
            </CardTitle>
            <CardDescription>Attendance by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">IT Department</p>
                  <p className="text-sm text-muted-foreground">12 employees</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">11</p>
                  <p className="text-xs text-muted-foreground">present</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">HR Department</p>
                  <p className="text-sm text-muted-foreground">8 employees</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">7</p>
                  <p className="text-xs text-muted-foreground">present</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">Finance</p>
                  <p className="text-sm text-muted-foreground">10 employees</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">9</p>
                  <p className="text-xs text-muted-foreground">present</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium">Sales</p>
                  <p className="text-sm text-muted-foreground">18 employees</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">15</p>
                  <p className="text-xs text-muted-foreground">present</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </AdminRoute>
  );
};

export default AdminDashboard;
