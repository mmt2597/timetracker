<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            // Executive Positions
            [
                'code' => 'CEO',
                'name' => 'Chief Executive Officer',
                'description' => 'Top executive responsible for overall company operations and strategy',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'CFO',
                'name' => 'Chief Financial Officer',
                'description' => 'Executive responsible for financial planning and risk management',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'CTO',
                'name' => 'Chief Technology Officer',
                'description' => 'Executive overseeing technology strategy and innovation',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'COO',
                'name' => 'Chief Operating Officer',
                'description' => 'Executive managing day-to-day operations',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // Management Positions
            [
                'code' => 'DEPT-MGR',
                'name' => 'Department Manager',
                'description' => 'Manages department operations and team performance',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'PROJ-MGR',
                'name' => 'Project Manager',
                'description' => 'Plans, executes, and oversees project completion',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'TEAM-LEAD',
                'name' => 'Team Leader',
                'description' => 'Leads and coordinates team activities',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // IT Positions
            [
                'code' => 'SR-DEV',
                'name' => 'Senior Developer',
                'description' => 'Experienced software developer with advanced technical skills',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'JR-DEV',
                'name' => 'Junior Developer',
                'description' => 'Entry-level software developer',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'DEVOPS',
                'name' => 'DevOps Engineer',
                'description' => 'Manages deployment pipelines and infrastructure',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'QA-ENG',
                'name' => 'QA Engineer',
                'description' => 'Tests software quality and identifies bugs',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'SYS-ADMIN',
                'name' => 'System Administrator',
                'description' => 'Maintains IT systems and networks',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // HR Positions
            [
                'code' => 'HR-MGR',
                'name' => 'HR Manager',
                'description' => 'Oversees human resources operations and policies',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'RECRUITER',
                'name' => 'Recruiter',
                'description' => 'Sources and screens potential candidates',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'HR-SPEC',
                'name' => 'HR Specialist',
                'description' => 'Handles specific HR functions and employee relations',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // Finance Positions
            [
                'code' => 'ACCOUNTANT',
                'name' => 'Accountant',
                'description' => 'Manages financial records and reporting',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'FIN-ANALYST',
                'name' => 'Financial Analyst',
                'description' => 'Analyzes financial data and provides insights',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'PAYROLL-SPEC',
                'name' => 'Payroll Specialist',
                'description' => 'Processes employee payroll and benefits',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // Sales & Marketing
            [
                'code' => 'SALES-MGR',
                'name' => 'Sales Manager',
                'description' => 'Leads sales team and drives revenue goals',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'SALES-REP',
                'name' => 'Sales Representative',
                'description' => 'Sells products and services to customers',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'MKT-SPEC',
                'name' => 'Marketing Specialist',
                'description' => 'Develops and executes marketing campaigns',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'CONTENT-WRITER',
                'name' => 'Content Writer',
                'description' => 'Creates marketing content and copy',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // Customer Service
            [
                'code' => 'CS-MGR',
                'name' => 'Customer Service Manager',
                'description' => 'Manages customer service team and operations',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'CS-REP',
                'name' => 'Customer Service Representative',
                'description' => 'Assists customers with inquiries and issues',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // Administrative
            [
                'code' => 'ADMIN-ASST',
                'name' => 'Administrative Assistant',
                'description' => 'Provides administrative support to management',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'RECEPTIONIST',
                'name' => 'Receptionist',
                'description' => 'Manages front desk and visitor reception',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // General
            [
                'code' => 'INTERN',
                'name' => 'Intern',
                'description' => 'Temporary position for students or recent graduates',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('positions')->insert($positions);
    }
}
