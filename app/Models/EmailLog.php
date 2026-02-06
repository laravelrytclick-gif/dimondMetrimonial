<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    protected $table = 'email_logs';

    public $timestamps = false; // using sent_at only

    protected $fillable = [
        'profile_id',
        'to_email',
        'subject',
        'template',
        'message_id',
        'status',
        'error_message',
        'sent_at',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    /* ======================
       Relationships
    ====================== */

    public function profile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'profile_id');
    }
}
