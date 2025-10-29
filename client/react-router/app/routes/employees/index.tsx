import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, Eye, Plus } from "lucide-react";
import { useEmployees, useDeleteEmployee } from "~/hooks/useEmployee";
import { DataTable } from "~/components/table/DataTable";
import { TableSkeleton } from "~/components/table/TableSkeleton";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import type { Employee } from "~/types/employee.types";
import { format } from "date-fns";

const Employees = () => {
  const { data, isLoading, isError } = useEmployees();
  const deleteMutation = useDeleteEmployee();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      deleteMutation.mutate(id);
    }
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "employee_id",
      header: "Employee ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("employee_id")}</div>
      ),
    },
    {
      accessorKey: "first_name",
      header: "Name",
      cell: ({ row }) => {
        const firstName = row.getValue("first_name") as string;
        const lastName = row.original.last_name;
        const middleName = row.original.middle_name;
        return (
          <div>
            <div className="font-medium">
              {firstName} {middleName ? middleName + " " : ""}{lastName}
            </div>
            <div className="text-sm text-muted-foreground">
              {row.original.email}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }) => row.original.position?.name || "N/A",
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => row.original.department?.name || "N/A",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "active"
                ? "default"
                : status === "inactive"
                ? "secondary"
                : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "hire_date",
      header: "Hire Date",
      cell: ({ row }) => {
        const date = row.getValue("hire_date") as string;
        return date ? format(new Date(date), "MMM d, yyyy") : "N/A";
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const employee = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.id.toString())}>
                Copy employee ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit employee
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(employee.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
             <p className="text-muted-foreground mt-2">
               Manage your organization's employees
             </p>
           </div>
         </div>
        <Card>
          <CardContent className="py-8">
            <TableSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
            <p className="text-muted-foreground mt-2">
              Manage your organization's employees
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-red-600">Failed to load employees</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground mt-2">
            Manage your organization's employees
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
          <CardDescription>
            View and manage all employees in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.data || []}
            searchKey="first_name"
            searchPlaceholder="Search by name..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;