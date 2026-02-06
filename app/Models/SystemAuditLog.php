<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemAuditLog extends Model
{
    protected $table = 'system_audit_logs';

    public $timestamps = false; // we only use created_at

    protected $fillable = [
        'entity',
        'entity_id',
        'action',
        'old_data',
        'new_data',
        'performed_by',
        'ip_address',
        'created_at',
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
        'created_at' => 'datetime',
    ];

    // optional relation
    public function performer()
    {
        return $this->belongsTo(User::class, 'performed_by');
    }
}
