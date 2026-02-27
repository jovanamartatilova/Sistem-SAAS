<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Company;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ambil company pertama
        $company = Company::first();

        // buat super admin (platform level)
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@saas.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
                'company_id' => null // platform level
            ]
        );

        $superAdmin->assignRole('Super Admin');

        // admin perusahaan
        if ($company) {
            $admin = User::firstOrCreate(
                ['email' => 'admin@ptdemo.com'],
                [
                    'name' => 'Admin PT Demo',
                    'password' => bcrypt('password'),
                    'company_id' => $company->id
                ]
            );

            $admin->assignRole('Admin Perusahaan');
        }
    }
}
