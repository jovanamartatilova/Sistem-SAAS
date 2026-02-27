<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\BelongsToCompany;


class Team extends Model
{
    use BelongsToCompany;
}
