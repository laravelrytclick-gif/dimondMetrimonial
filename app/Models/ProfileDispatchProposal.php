<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileDispatchProposal extends Model
{
    protected $table = 'profile_dispatch_proposals';

    public $timestamps = false; // we use sent_at only

    protected $fillable = [
        'sender_profile_id',
        'receiver_profile_id',
        'sent_by',
        'medium',
        'side',
        'proposal_status',
        'sent_at',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    /* ======================
       Relationships
    ====================== */

    public function senderProfile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'sender_profile_id');
    }

    public function receiverProfile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'receiver_profile_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sent_by');
    }
}
