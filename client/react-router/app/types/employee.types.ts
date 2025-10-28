export interface Employee {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  hire_date?: string;
  position_id?: number;
  department_id?: number;
  salary?: number;
  status: 'active' | 'inactive' | 'on_leave';
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  created_at: string;
  updated_at: string;
  position?: {
    id: number;
    name: string;
    code: string;
  };
  department?: {
    id: number;
    name: string;
    code: string;
  };
}

export interface EmployeeFormData {
  employee_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  hire_date?: string;
  position_id?: number;
  department_id?: number;
  salary?: number;
  status: 'active' | 'inactive' | 'on_leave';
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
}

export type CreateEmployeeData = EmployeeFormData;
export type UpdateEmployeeData = Partial<EmployeeFormData>;

export interface EmployeesResponse {
  data: Employee[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
