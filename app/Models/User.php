<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Mass assignable fields
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
        'last_login_at',
    ];

    /**
     * Hidden fields (API / JSON)
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Casts
     */
    protected $casts = [
        'is_active' => 'boolean',
        'last_login_at' => 'datetime',
        'password' => 'hashed',
    ];
}
