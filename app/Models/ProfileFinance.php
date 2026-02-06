<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileFinance extends Model
{
    protected $table = 'profile_finances';

    public $timestamps = false; // only created_at

    protected $fillable = [
        'profile_id',
        'package_name',
        'amount_paid',
        'payment_date',
        'payment_mode',
        'expiry_date',
        'remarks',
        'created_at',
    ];

    protected $casts = [
        'amount_paid' => 'decimal:2',
        'payment_date' => 'date',
        'expiry_date' => 'date',
        'created_at' => 'datetime',
    ];

    /* ======================
       Relationships
    ====================== */

    public function profile()
    {
        return $this->belongsTo(UserMasterProfile::class, 'profile_id');
    }
}
