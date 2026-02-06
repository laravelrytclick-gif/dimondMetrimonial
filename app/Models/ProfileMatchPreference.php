<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileMatchPreference extends Model
{
    protected $table = 'profile_match_preferences';

    protected $fillable = [
        'profile_id',
        'preferences',
        'comments',
    ];

    protected $casts = [
        'preferences' => 'array',
    ];

    /* ======================
       Relationships
    ====================== */

    public function profile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'profile_id');
    }
}
