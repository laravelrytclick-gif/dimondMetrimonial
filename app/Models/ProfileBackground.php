<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfileBackground extends Model
{
    protected $table = 'profile_background';

    protected $fillable = [
        'profile_id',
        'type',           // education | profession
        'title',
        'organization',
        'specialization',
        'location',
        'year_from',
        'year_to',
        'income',
    ];

    /**
     * Background belongs to a master profile
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(UserMasterProfile::class, 'profile_id');
    }
}
