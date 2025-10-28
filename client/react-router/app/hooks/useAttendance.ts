import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceApi } from "~/api/attendance";
import { QUERY_KEYS } from "~/config/constants";
import type {
  TimeInData,
  TimeOutData,
  AttendanceHistoryParams,
  AttendanceListParams,
  AttendanceStatisticsParams,
} from "~/types/attendance.types";

/**
 * Hook to get today's attendance for an employee
 */
export function useTodayAttendance(employeeId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCE, "today", employeeId],
    queryFn: () => attendanceApi.getTodayAttendance(employeeId),
    enabled: !!employeeId,
    retry: false,
  });
}

/**
 * Hook to time in (clock in)
 */
export function useTimeIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TimeInData) => attendanceApi.timeIn(data),
    onSuccess: (_, variables) => {
      // Invalidate today's attendance query
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTENDANCE, "today", variables.employee_id],
      });
      // Invalidate attendance history
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTENDANCE, "history"],
      });
      // Invalidate attendance list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTENDANCE, "list"],
      });
    },
  });
}

/**
 * Hook to time out (clock out)
 */
export function useTimeOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TimeOutData) => attendanceApi.timeOut(data),
    onSuccess: (_, variables) => {
      // Invalidate today's attendance query
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTENDANCE, "today", variables.employee_id],
      });
      // Invalidate attendance history
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTENDANCE, "history"],
      });
      // Invalidate attendance list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTENDANCE, "list"],
      });
    },
  });
}

/**
 * Hook to get attendance history for an employee
 */
export function useAttendanceHistory(params: AttendanceHistoryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCE, "history", params],
    queryFn: () => attendanceApi.getAttendanceHistory(params),
    enabled: !!params.employee_id,
  });
}

/**
 * Hook to get all attendance records (Admin)
 */
export function useAttendanceList(params?: AttendanceListParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCE, "list", params],
    queryFn: () => attendanceApi.getAllAttendance(params),
  });
}

/**
 * Hook to get attendance statistics
 */
export function useAttendanceStatistics(params: AttendanceStatisticsParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCE, "statistics", params],
    queryFn: () => attendanceApi.getStatistics(params),
    enabled: !!params.employee_id,
  });
}
