<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileCallFollowup extends Model
{
    protected $table = 'profile_calls_followups';

    public $timestamps = false; // only created_at

    protected $fillable = [
        'profile_id',
        'call_type',
        'call_status',
        'remarks',
        'followup_date',
        'performed_by',
        'created_at',
    ];

    protected $casts = [
        'followup_date' => 'datetime',
        'created_at' => 'datetime',
    ];

    /* ======================
       Relationships
    ====================== */

    public function profile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'profile_id');
    }

    public function performer()
    {
        return $this->belongsTo(User::class, 'performed_by');
    }
}
