<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileAttachment extends Model
{
    protected $table = 'profile_attachments';

    public $timestamps = false; // only created_at

    protected $fillable = [
        'profile_id',
        'category',
        'file_name',
        'file_path',
        'meta',
        'uploaded_by',
        'created_at',
    ];

    protected $casts = [
        'meta' => 'array',
        'created_at' => 'datetime',
    ];

    /* ======================
       Relationships
    ====================== */

    public function profile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'profile_id');
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
