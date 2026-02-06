<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserMasterProfile extends Model
{
    protected $table = 'user_master_profiles';

    protected $fillable = [
        'user_code',
        'full_name',
        'gender',
        'dob',
        'birth_time',
        'birth_place',
        'religion',
        'caste',
        'sub_caste',
        'gotra',
        'height',
        'weight',
        'complexion',
        'blood_group',
        'eating_habit',
        'smoking_habit',
        'drinking_habit',
        'phone',
        'alternate_phone',
        'email',
        'address',
        'city',
        'state',
        'country',
        'highest_education',
        'occupation',
        'income',
        'work_location',
        'rm_id',
        'status',
        'registration_date',
    ];

    protected $casts = [
        'dob' => 'date',
        'birth_time' => 'datetime:H:i',
        'registration_date' => 'date',
    ];

    /* ======================
       Relationships
    ====================== */

    // RM handling this candidate
    public function rm()
    {
        return $this->belongsTo(User::class, 'rm_id');
    }
}
