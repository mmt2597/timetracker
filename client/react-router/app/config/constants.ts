export const API_CONFIG = {
  BASE_URL: 'http://api.payroll.test/api',
  TIMEOUT: 10000,
} as const;

export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'user',
  STORAGE_KEY: 'auth-storage',
} as const;

export const QUERY_KEYS = {
  USER: 'user',
  DEPARTMENTS: 'departments',
  POSITIONS: 'positions',
  EMPLOYEES: 'employees',
  ATTENDANCE: 'attendance',
  PAYROLL: 'payroll',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  EMPLOYEES: '/employees',
  PAYROLL: '/payroll',
  SETTINGS: '/settings',
  SETTINGS_DEPARTMENTS: '/settings/departments',
  SETTINGS_POSITIONS: '/settings/positions',
} as const;
