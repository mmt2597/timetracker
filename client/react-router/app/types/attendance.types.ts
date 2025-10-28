import type { Employee } from './employee.types';

export interface Attendance {
  id: number;
  employee_id: number;
  date: string;
  time_in: string | null;
  time_out: string | null;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'on_leave';
  notes: string | null;
  created_at: string;
  updated_at: string;
  employee?: Employee;
}

export interface TimeInData {
  employee_id: number;
  notes?: string;
}

export interface TimeOutData {
  employee_id: number;
  notes?: string;
}

export interface AttendanceHistoryParams {
  employee_id: number;
  start_date?: string;
  end_date?: string;
  status?: 'present' | 'absent' | 'late' | 'half_day' | 'on_leave';
}

export interface AttendanceListParams {
  date?: string;
  status?: 'present' | 'absent' | 'late' | 'half_day' | 'on_leave';
  department_id?: number;
}

export interface AttendanceStatisticsParams {
  employee_id: number;
  month?: number;
  year?: number;
}

export interface AttendanceStatistics {
  total_days: number;
  present: number;
  late: number;
  absent: number;
  half_day: number;
  on_leave: number;
  total_hours: number;
}

export interface AttendanceResponse {
  success: boolean;
  message?: string;
  data: Attendance | null;
}

export interface AttendanceListResponse {
  success: boolean;
  data: Attendance[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface AttendanceStatisticsResponse {
  success: boolean;
  data: AttendanceStatistics;
  period: {
    month: number;
    year: number;
  };
}

// Legacy types for backward compatibility
export interface TimeEntry {
  id: number;
  user_id: number;
  date: string;
  time_in: string | null;
  time_out: string | null;
  status: 'in' | 'out' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface AttendanceStats {
  total_days: number;
  present_days: number;
  total_hours: number;
  today_status: 'not_started' | 'clocked_in' | 'clocked_out';
  today_entry?: TimeEntry;
}
