<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Program;
use App\Models\Company;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        $company = Company::first();

        if ($company) {
            Program::create([
                'name' => 'Magang Web Developer',
                'company_id' => $company->id,
                'type' => 'regular',
                'batch_number' => 1,
                'start_date' => '2026-01-01',
                'end_date' => '2026-06-30',
                'quota' => 10,
                'status' => 'publish',
            ]);
        }
    }
}
