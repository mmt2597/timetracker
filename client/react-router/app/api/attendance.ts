import { api } from '~/lib/api';
import type {
  TimeEntry,
  AttendanceStats,
  Attendance,
  TimeInData,
  TimeOutData,
  AttendanceHistoryParams,
  AttendanceListParams,
  AttendanceStatisticsParams,
  AttendanceResponse,
  AttendanceListResponse,
  AttendanceStatisticsResponse,
} from '~/types/attendance.types';

export const attendanceApi = {
  // Time In - Clock in for the day
  timeIn: async (data: TimeInData): Promise<AttendanceResponse> => {
    const response = await api.post<AttendanceResponse>('/attendance/time-in', data);
    return response.data;
  },

  // Time Out - Clock out for the day
  timeOut: async (data: TimeOutData): Promise<AttendanceResponse> => {
    const response = await api.post<AttendanceResponse>('/attendance/time-out', data);
    return response.data;
  },

  // Get today's attendance
  getTodayAttendance: async (employeeId: number): Promise<AttendanceResponse> => {
    const response = await api.get<AttendanceResponse>('/attendance/today', {
      params: { employee_id: employeeId },
    });
    return response.data;
  },

  // Get attendance history
  getAttendanceHistory: async (params: AttendanceHistoryParams): Promise<AttendanceListResponse> => {
    const response = await api.get<AttendanceListResponse>('/attendance/history', {
      params,
    });
    return response.data;
  },

  // Get all attendance records (Admin)
  getAllAttendance: async (params?: AttendanceListParams): Promise<AttendanceListResponse> => {
    const response = await api.get<AttendanceListResponse>('/attendance', {
      params,
    });
    return response.data;
  },

  // Get attendance statistics
  getStatistics: async (params: AttendanceStatisticsParams): Promise<AttendanceStatisticsResponse> => {
    const response = await api.get<AttendanceStatisticsResponse>('/attendance/statistics', {
      params,
    });
    return response.data;
  },

  // Legacy API methods for backward compatibility
  clockIn: async (): Promise<{ message: string; entry: TimeEntry }> => {
    const response = await api.post('/attendance/clock-in');
    return response.data;
  },

  clockOut: async (): Promise<{ message: string; entry: TimeEntry }> => {
    const response = await api.post('/attendance/clock-out');
    return response.data;
  },

  getToday: async (): Promise<{ entry: TimeEntry | null }> => {
    const response = await api.get('/attendance/today');
    return response.data;
  },

  getHistory: async (limit = 10): Promise<{ entries: TimeEntry[] }> => {
    const response = await api.get(`/attendance/history?limit=${limit}`);
    return response.data;
  },

  getStats: async (): Promise<AttendanceStats> => {
    const response = await api.get('/attendance/stats');
    return response.data;
  },
};
