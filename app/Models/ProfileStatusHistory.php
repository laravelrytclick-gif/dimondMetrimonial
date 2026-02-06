<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileStatusHistory extends Model
{
    protected $table = 'profile_status_histories';

    public $timestamps = false; // we use changed_at only

    protected $fillable = [
        'profile_id',
        'old_status',
        'new_status',
        'changed_by',
        'reason',
        'changed_at',
    ];

    protected $casts = [
        'changed_at' => 'datetime',
    ];

    /* ======================
       Relationships
    ====================== */

    public function profile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'profile_id');
    }

    public function changer()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
