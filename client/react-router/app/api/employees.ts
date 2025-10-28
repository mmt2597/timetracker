import { api } from '~/lib/api';
import type { Employee, EmployeeFormData, EmployeesResponse } from '~/types/employee.types';

export const employeeApi = {
  // Get all employees
  getAll: async (): Promise<EmployeesResponse> => {
    const response = await api.get<EmployeesResponse>('/employees');
    return response.data;
  },

  // Get single employee
  getById: async (id: number): Promise<{ data: Employee }> => {
    const response = await api.get<{ data: Employee }>(`/employees/${id}`);
    return response.data;
  },

  // Create employee
  create: async (data: EmployeeFormData): Promise<{ data: Employee; message: string }> => {
    const response = await api.post<{ data: Employee; message: string }>('/employees', data);
    return response.data;
  },

  // Update employee
  update: async (id: number, data: Partial<EmployeeFormData>): Promise<{ data: Employee; message: string }> => {
    const response = await api.put<{ data: Employee; message: string }>(`/employees/${id}`, data);
    return response.data;
  },

  // Delete employee
  delete: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/employees/${id}`);
    return response.data;
  },
};
