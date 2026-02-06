<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
 use App\Models\UserMasterProfile;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ProfileFamily extends Model
{
    protected $table = 'profile_family';

    protected $primaryKey = 'id';

    public $timestamps = true;

    protected $fillable = [
        'profile_id',
        'member_type',
        'name',
        'age',
        'occupation',
        'marital_status',
        'living_with_candidate',
        'notes',
    ];

    protected $casts = [
        'age' => 'integer',
        'living_with_candidate' => 'boolean',
    ];

    /**
     * Relation: family member belongs to a profile
     */


public function profile(): BelongsTo
{
    return $this->belongsTo(UserMasterProfile::class, 'profile_id');
}

}
