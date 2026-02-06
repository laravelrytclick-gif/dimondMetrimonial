<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileMeeting extends Model
{
    protected $table = 'profile_meetings';

    public $timestamps = false; // only created_at

    protected $fillable = [
        'profile_id',
        'matched_profile_id',
        'scheduled_by',
        'meeting_type',
        'meeting_date',
        'meeting_time',
        'venue',
        'attendees',
        'status',
        'outcome',
        'next_action_date',
        'created_at',
    ];

    protected $casts = [
        'meeting_date' => 'date',
        'meeting_time' => 'datetime:H:i',
        'next_action_date' => 'date',
        'attendees' => 'array',
        'created_at' => 'datetime',
    ];

    /* ======================
       Relationships
    ====================== */

    public function profile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'profile_id');
    }

    public function matchedProfile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'matched_profile_id');
    }

    public function scheduler()
    {
        return $this->belongsTo(User::class, 'scheduled_by');
    }
}
