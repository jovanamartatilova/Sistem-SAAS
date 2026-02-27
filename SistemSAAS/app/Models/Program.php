<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\BelongsToCompany;

class Program extends Model
{
    use BelongsToCompany;

    protected $fillable = [
    'name',
    'company_id',
    'type',
    'batch_number',
    'start_date',
    'end_date',
    'quota',
    'status',
];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
