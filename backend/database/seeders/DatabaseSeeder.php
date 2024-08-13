<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Admin User',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'phone' => '1234567890',
            'password' => Hash::make('pastibisa'),
        ]);

        $this->call(DivisionSeeder::class);
        $this->call(EmployeesSeeder::class);

    }
}
