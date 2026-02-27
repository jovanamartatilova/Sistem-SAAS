<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\User;

class CompanyUserSeeder extends Seeder
{
    public function run(): void
    {
       $company = Company::firstOrCreate(
    ['slug' => 'pt-demo'],
    [
        'name' => 'PT Demo',
        'email' => 'admin@ptdemo.com'
    ]
);

User::firstOrCreate(
    ['email' => 'admin@ptdemo.com'],
    [
        'name' => 'Admin PT Demo',
        'password' => bcrypt('password'),
        'company_id' => $company->id
    ]
);
    }
}
