<?php

namespace App\Models\Traits;

use App\Models\Company;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToCompany
{
    /**
     * Relasi ke company
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Auto filter berdasarkan company login
     */
    protected static function bootBelongsToCompany()
    {
        static::creating(function ($model) {
            if (auth()->check() && empty($model->company_id)) {
                $model->company_id = auth()->user()->company_id;
            }
        });

        static::addGlobalScope('company', function (Builder $builder) {
            if (auth()->check()) {
                $builder->where(
                    $builder->getModel()->getTable() . '.company_id',
                    auth()->user()->company_id
                );
            }
        });
    }
}
