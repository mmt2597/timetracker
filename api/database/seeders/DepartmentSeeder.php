<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'code' => 'HR',
                'name' => 'Human Resources',
                'description' => 'Manages employee relations, recruitment, and organizational development',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'IT',
                'name' => 'Information Technology',
                'description' => 'Handles technology infrastructure, software development, and IT support',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'FIN',
                'name' => 'Finance',
                'description' => 'Manages financial planning, accounting, and budgeting',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'MKT',
                'name' => 'Marketing',
                'description' => 'Oversees brand management, advertising, and market research',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'SALES',
                'name' => 'Sales',
                'description' => 'Drives revenue through customer acquisition and relationship management',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'OPS',
                'name' => 'Operations',
                'description' => 'Manages daily business operations and process optimization',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'CS',
                'name' => 'Customer Service',
                'description' => 'Provides customer support and ensures client satisfaction',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'ADM',
                'name' => 'Administration',
                'description' => 'Handles general administrative tasks and office management',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'RND',
                'name' => 'Research & Development',
                'description' => 'Focuses on innovation, product development, and research initiatives',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'LEGAL',
                'name' => 'Legal',
                'description' => 'Manages legal compliance, contracts, and corporate governance',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('departments')->insert($departments);
    }
}
