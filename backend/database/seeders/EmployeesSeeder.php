<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Division;
use App\Models\Employee;

class EmployeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = Division::all();

        foreach ($divisions as $division) {
            for ($i = 1; $i <= 3; $i++) {
                Employee::create([
                    'image' => 'https://example.com/image' . $i . '.jpg',
                    'name' => 'Employee ' . $i . $division->name,
                    'phone' => '1234567890',
                    'division_id' => $division->id,
                    'position' => 'Position ' . $i,
                ]);
            }
        }
    }
}
