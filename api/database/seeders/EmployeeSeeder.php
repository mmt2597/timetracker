<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Department;
use App\Models\Position;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get departments and positions
        $departments = Department::all();
        $positions = Position::all();

        if ($departments->isEmpty() || $positions->isEmpty()) {
            $this->command->error('Please run DepartmentSeeder and PositionSeeder first!');
            return;
        }

        $employees = [
            // HR Department
            [
                'first_name' => 'Sarah',
                'middle_name' => 'Ann',
                'last_name' => 'Johnson',
                'email' => 'sarah.johnson@payroll.com',
                'phone' => '+1-555-0101',
                'birth_date' => '1985-03-15',
                'gender' => 'female',
                'address' => '123 Main St, New York, NY 10001',
                'hire_date' => '2020-01-15',
                'department' => 'HR',
                'position' => 'HR-DIR',
                'basic_salary' => 95000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'admin',
            ],
            [
                'first_name' => 'Michael',
                'middle_name' => 'Robert',
                'last_name' => 'Chen',
                'email' => 'michael.chen@payroll.com',
                'phone' => '+1-555-0102',
                'birth_date' => '1990-07-22',
                'gender' => 'male',
                'address' => '456 Oak Ave, Brooklyn, NY 11201',
                'hire_date' => '2021-03-10',
                'department' => 'HR',
                'position' => 'HR-REC',
                'basic_salary' => 65000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'employee',
            ],

            // IT Department
            [
                'first_name' => 'David',
                'middle_name' => 'Lee',
                'last_name' => 'Martinez',
                'email' => 'david.martinez@payroll.com',
                'phone' => '+1-555-0103',
                'birth_date' => '1988-11-05',
                'gender' => 'male',
                'address' => '789 Tech Blvd, San Francisco, CA 94102',
                'hire_date' => '2019-06-01',
                'department' => 'IT',
                'position' => 'IT-DIR',
                'basic_salary' => 120000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'admin',
            ],
            [
                'first_name' => 'Emily',
                'middle_name' => 'Grace',
                'last_name' => 'Thompson',
                'email' => 'emily.thompson@payroll.com',
                'phone' => '+1-555-0104',
                'birth_date' => '1992-04-18',
                'gender' => 'female',
                'address' => '321 Code St, Austin, TX 78701',
                'hire_date' => '2021-09-15',
                'department' => 'IT',
                'position' => 'IT-DEV-SR',
                'basic_salary' => 95000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'employee',
            ],
            [
                'first_name' => 'James',
                'middle_name' => 'Patrick',
                'last_name' => 'Wilson',
                'email' => 'james.wilson@payroll.com',
                'phone' => '+1-555-0105',
                'birth_date' => '1995-08-30',
                'gender' => 'male',
                'address' => '654 Binary Lane, Seattle, WA 98101',
                'hire_date' => '2022-02-20',
                'department' => 'IT',
                'position' => 'IT-DEV',
                'basic_salary' => 75000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'employee',
            ],

            // Finance Department
            [
                'first_name' => 'Jennifer',
                'middle_name' => 'Marie',
                'last_name' => 'Brown',
                'email' => 'jennifer.brown@payroll.com',
                'phone' => '+1-555-0106',
                'birth_date' => '1987-12-10',
                'gender' => 'female',
                'address' => '987 Finance Ave, Chicago, IL 60601',
                'hire_date' => '2020-05-01',
                'department' => 'FIN',
                'position' => 'FIN-DIR',
                'basic_salary' => 110000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'admin',
            ],
            [
                'first_name' => 'Robert',
                'middle_name' => 'James',
                'last_name' => 'Davis',
                'email' => 'robert.davis@payroll.com',
                'phone' => '+1-555-0107',
                'birth_date' => '1991-06-25',
                'gender' => 'male',
                'address' => '147 Money St, Boston, MA 02101',
                'hire_date' => '2021-11-08',
                'department' => 'FIN',
                'position' => 'FIN-ACC-SR',
                'basic_salary' => 80000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'employee',
            ],

            // Marketing Department
            [
                'first_name' => 'Amanda',
                'middle_name' => 'Rose',
                'last_name' => 'Garcia',
                'email' => 'amanda.garcia@payroll.com',
                'phone' => '+1-555-0108',
                'birth_date' => '1989-09-14',
                'gender' => 'female',
                'address' => '258 Creative Dr, Los Angeles, CA 90001',
                'hire_date' => '2020-08-20',
                'department' => 'MKT',
                'position' => 'MKT-DIR',
                'basic_salary' => 105000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'admin',
            ],
            [
                'first_name' => 'Christopher',
                'middle_name' => 'Daniel',
                'last_name' => 'Miller',
                'email' => 'chris.miller@payroll.com',
                'phone' => '+1-555-0109',
                'birth_date' => '1993-02-28',
                'gender' => 'male',
                'address' => '369 Brand Blvd, Miami, FL 33101',
                'hire_date' => '2022-04-12',
                'department' => 'MKT',
                'position' => 'MKT-MGR',
                'basic_salary' => 75000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'employee',
            ],

            // Sales Department
            [
                'first_name' => 'Jessica',
                'middle_name' => 'Lynn',
                'last_name' => 'Anderson',
                'email' => 'jessica.anderson@payroll.com',
                'phone' => '+1-555-0110',
                'birth_date' => '1986-05-17',
                'gender' => 'female',
                'address' => '741 Sales Pkwy, Dallas, TX 75201',
                'hire_date' => '2019-10-05',
                'department' => 'SAL',
                'position' => 'SAL-DIR',
                'basic_salary' => 100000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'admin',
            ],
            [
                'first_name' => 'Matthew',
                'middle_name' => 'John',
                'last_name' => 'Taylor',
                'email' => 'matthew.taylor@payroll.com',
                'phone' => '+1-555-0111',
                'birth_date' => '1994-11-20',
                'gender' => 'male',
                'address' => '852 Deal St, Phoenix, AZ 85001',
                'hire_date' => '2021-07-15',
                'department' => 'SAL',
                'position' => 'SAL-MGR',
                'basic_salary' => 72000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'employee',
            ],

            // Operations Department
            [
                'first_name' => 'Ashley',
                'middle_name' => 'Nicole',
                'last_name' => 'Thomas',
                'email' => 'ashley.thomas@payroll.com',
                'phone' => '+1-555-0112',
                'birth_date' => '1990-01-08',
                'gender' => 'female',
                'address' => '963 Operations Way, Denver, CO 80201',
                'hire_date' => '2020-12-01',
                'department' => 'OPS',
                'position' => 'OPS-DIR',
                'basic_salary' => 98000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'admin',
            ],

            // Customer Service
            [
                'first_name' => 'Daniel',
                'middle_name' => 'William',
                'last_name' => 'Moore',
                'email' => 'daniel.moore@payroll.com',
                'phone' => '+1-555-0113',
                'birth_date' => '1996-07-12',
                'gender' => 'male',
                'address' => '159 Service Ln, Portland, OR 97201',
                'hire_date' => '2022-06-20',
                'department' => 'CS',
                'position' => 'CS-MGR',
                'basic_salary' => 68000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'employee',
            ],
            [
                'first_name' => 'Stephanie',
                'middle_name' => 'Marie',
                'last_name' => 'Jackson',
                'email' => 'stephanie.jackson@payroll.com',
                'phone' => '+1-555-0114',
                'birth_date' => '1997-03-05',
                'gender' => 'female',
                'address' => '357 Support Ave, Atlanta, GA 30301',
                'hire_date' => '2023-01-10',
                'department' => 'CS',
                'position' => 'CS-REP',
                'basic_salary' => 45000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'employee',
            ],

            // Legal Department
            [
                'first_name' => 'Brian',
                'middle_name' => 'Scott',
                'last_name' => 'White',
                'email' => 'brian.white@payroll.com',
                'phone' => '+1-555-0115',
                'birth_date' => '1984-10-22',
                'gender' => 'male',
                'address' => '753 Legal Dr, Washington, DC 20001',
                'hire_date' => '2018-03-15',
                'department' => 'LEG',
                'position' => 'LEG-GC',
                'basic_salary' => 135000.00,
                'employment_type' => 'full-time',
                'status' => 'active',
                'role' => 'admin',
            ],

            // Part-time and Contract employees
            [
                'first_name' => 'Nicole',
                'middle_name' => 'Elizabeth',
                'last_name' => 'Harris',
                'email' => 'nicole.harris@payroll.com',
                'phone' => '+1-555-0116',
                'birth_date' => '1998-08-19',
                'gender' => 'female',
                'address' => '951 Temp St, Nashville, TN 37201',
                'hire_date' => '2023-09-01',
                'department' => 'MKT',
                'position' => 'MKT-SPEC',
                'basic_salary' => 35000.00,
                'employment_type' => 'part-time',
                'status' => 'active',
                'role' => 'employee',
            ],
            [
                'first_name' => 'Kevin',
                'middle_name' => 'Paul',
                'last_name' => 'Martin',
                'email' => 'kevin.martin@payroll.com',
                'phone' => '+1-555-0117',
                'birth_date' => '1991-12-03',
                'gender' => 'male',
                'address' => '357 Contract Ave, Las Vegas, NV 89101',
                'hire_date' => '2023-06-15',
                'department' => 'IT',
                'position' => 'IT-DEV',
                'basic_salary' => 85000.00,
                'employment_type' => 'contract',
                'status' => 'active',
                'role' => 'employee',
            ],

            // Inactive employee
            [
                'first_name' => 'Rachel',
                'middle_name' => 'Ann',
                'last_name' => 'Lee',
                'email' => 'rachel.lee@payroll.com',
                'phone' => '+1-555-0118',
                'birth_date' => '1989-04-15',
                'gender' => 'female',
                'address' => '159 Former St, Orlando, FL 32801',
                'hire_date' => '2020-02-10',
                'department' => 'FIN',
                'position' => 'FIN-ACC',
                'basic_salary' => 62000.00,
                'employment_type' => 'full-time',
                'status' => 'inactive',
                'role' => 'employee',
            ],

            // On-leave employee
            [
                'first_name' => 'Thomas',
                'middle_name' => 'Edward',
                'last_name' => 'Robinson',
                'email' => 'thomas.robinson@payroll.com',
                'phone' => '+1-555-0119',
                'birth_date' => '1987-09-27',
                'gender' => 'male',
                'address' => '753 Break Blvd, Minneapolis, MN 55401',
                'hire_date' => '2019-11-20',
                'department' => 'OPS',
                'position' => 'OPS-MGR',
                'basic_salary' => 78000.00,
                'employment_type' => 'full-time',
                'status' => 'on-leave',
                'role' => 'employee',
            ],
        ];

        foreach ($employees as $index => $employeeData) {
            // Create user account
            $user = User::create([
                'name' => $employeeData['first_name'] . ' ' . $employeeData['last_name'],
                'email' => $employeeData['email'],
                'password' => Hash::make('password'),
                'role' => $employeeData['role'],
                'email_verified_at' => Carbon::now(),
            ]);

            // Find department and position
            $department = Department::inRandomOrder()->first();
            $position = Position::inRandomOrder()->first();

            // Create employee record
            DB::table('employees')->insert([
                'user_id' => $user->id,
                'employee_code' => 'EMP-' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'first_name' => $employeeData['first_name'],
                'middle_name' => $employeeData['middle_name'],
                'last_name' => $employeeData['last_name'],
                'email' => $employeeData['email'],
                'phone' => $employeeData['phone'],
                'birth_date' => $employeeData['birth_date'],
                'gender' => $employeeData['gender'],
                'address' => $employeeData['address'],
                'hire_date' => $employeeData['hire_date'],
                'position_id' => $position ? $position->id : null,
                'department_id' => $department ? $department->id : null,
                'basic_salary' => $employeeData['basic_salary'],
                'employment_type' => $employeeData['employment_type'],
                'status' => $employeeData['status'],
                'notes' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        $this->command->info('Successfully created ' . count($employees) . ' employees with user accounts!');
        $this->command->info('Default password for all users: password');
    }
}
