import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";
import { useTodayAttendance, useTimeIn, useTimeOut } from "~/hooks/useAttendance";
import { Clock, LogIn, LogOut, Calendar, Timer, Umbrella, CalendarDays } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const employeeId = user?.employee?.id;

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Query for today's attendance
  const { data: attendanceResponse, isLoading } = useTodayAttendance(employeeId || 0);
  const todayEntry = attendanceResponse?.data;

  // Clock In mutation
  const timeInMutation = useTimeIn();

  // Clock Out mutation
  const timeOutMutation = useTimeOut();

  const handleTimeIn = () => {
    if (!employeeId) return;
    timeInMutation.mutate({ employee_id: employeeId });
  };

  const handleTimeOut = () => {
    if (!employeeId) return;
    timeOutMutation.mutate({ employee_id: employeeId });
  };

  const isClockedIn = todayEntry?.time_in && !todayEntry?.time_out;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground mt-2">
          {format(currentTime, 'EEEE, MMMM d, yyyy')}
        </p>
      </div>

      {/* Main Clock Card */}
      <Card className="bg-linear-to-br from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Current Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold mb-4">
              {format(currentTime, 'HH:mm:ss')}
            </div>
            <div className="text-xl text-muted-foreground mb-6">
              {format(currentTime, 'EEEE, MMMM d, yyyy')}
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              {isClockedIn ? (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  Currently Clocked In
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                  <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                  Not Clocked In
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              {!isClockedIn ? (
                <Button
                  size="lg"
                  onClick={handleTimeIn}
                  disabled={timeInMutation.isPending || !employeeId}
                  className="min-w-[200px]"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  {timeInMutation.isPending ? 'Clocking In...' : 'Clock In'}
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={handleTimeOut}
                  disabled={timeOutMutation.isPending || !employeeId}
                  className="min-w-[200px]"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  {timeOutMutation.isPending ? 'Clocking Out...' : 'Clock Out'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Entry */}
      {todayEntry && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Attendance
            </CardTitle>
            <CardDescription>Your time entry for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <LogIn className="h-4 w-4" />
                  <span className="font-medium">Time In</span>
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {todayEntry.time_in || '--:--'}
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Time Out</span>
                </div>
                <div className="text-2xl font-bold text-red-900">
                  {todayEntry.time_out || '--:--'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Hours (Month)
            </CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">160 hrs</div>
            <p className="text-xs text-muted-foreground">
              20 days this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Days Present
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20 days</div>
            <p className="text-xs text-muted-foreground">
              Out of 22 working days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance Rate
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <p className="text-xs text-muted-foreground">
              Above average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leave Balance and Upcoming Holidays */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Remaining Leaves */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Umbrella className="h-5 w-5" />
              Leave Balance
            </CardTitle>
            <CardDescription>Your remaining leave credits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Vacation Leave */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Vacation Leave</p>
                  <p className="text-sm text-blue-600">Annual leave credits</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-900">12</p>
                  <p className="text-xs text-blue-600">days left</p>
                </div>
              </div>

              {/* Sick Leave */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Sick Leave</p>
                  <p className="text-sm text-green-600">Medical leave credits</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-900">7</p>
                  <p className="text-xs text-green-600">days left</p>
                </div>
              </div>

              {/* Emergency Leave */}
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-orange-900">Emergency Leave</p>
                  <p className="text-sm text-orange-600">Urgent situations</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-900">3</p>
                  <p className="text-xs text-orange-600">days left</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Holidays */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Upcoming Holidays
            </CardTitle>
            <CardDescription>Next company holidays</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Holiday 1 */}
              <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="shrink-0 w-12 h-12 flex flex-col items-center justify-center bg-primary/10 rounded-lg">
                  <span className="text-lg font-bold">01</span>
                  <span className="text-xs text-muted-foreground">Nov</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">All Saints' Day</p>
                  <p className="text-sm text-muted-foreground">National Holiday</p>
                  <p className="text-xs text-muted-foreground mt-1">4 days away</p>
                </div>
              </div>

              {/* Holiday 2 */}
              <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="shrink-0 w-12 h-12 flex flex-col items-center justify-center bg-primary/10 rounded-lg">
                  <span className="text-lg font-bold">30</span>
                  <span className="text-xs text-muted-foreground">Nov</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Bonifacio Day</p>
                  <p className="text-sm text-muted-foreground">National Holiday</p>
                  <p className="text-xs text-muted-foreground mt-1">33 days away</p>
                </div>
              </div>

              {/* Holiday 3 */}
              <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="shrink-0 w-12 h-12 flex flex-col items-center justify-center bg-primary/10 rounded-lg">
                  <span className="text-lg font-bold">25</span>
                  <span className="text-xs text-muted-foreground">Dec</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Christmas Day</p>
                  <p className="text-sm text-muted-foreground">National Holiday</p>
                  <p className="text-xs text-muted-foreground mt-1">58 days away</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
