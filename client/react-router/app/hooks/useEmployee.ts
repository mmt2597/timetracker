import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "~/api/employees";
import { QUERY_KEYS } from "~/config/constants";
import type { CreateEmployeeData, UpdateEmployeeData } from "~/types/employee.types";

interface UseEmployeesOptions {
  page?: number;
  per_page?: number;
}

export function useEmployees(options: UseEmployeesOptions = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.EMPLOYEES, options],
    queryFn: () => employeeApi.getAll(),
  });
}

export function useEmployee(id: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.EMPLOYEES, id],
    queryFn: () => employeeApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeData) => employeeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EMPLOYEES] });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmployeeData }) =>
      employeeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EMPLOYEES] });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => employeeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EMPLOYEES] });
    },
  });
}
