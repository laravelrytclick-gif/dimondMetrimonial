<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ProfileMatchPreference;
use App\Models\UserMasterProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileMatchPreferenceController extends Controller
{
    /**
     * GET match preference of a profile
     */
    public function show($profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        // RM access check
        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        return response()->json(
            ProfileMatchPreference::where('profile_id', $profileId)->first()
        );
    }

    /**
     * CREATE / UPDATE match preference
     */
    public function store(Request $request, $profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $data = $request->validate([
            'preferences' => 'required|array',
            'comments' => 'nullable|string',
        ]);

        $data['profile_id'] = $profileId;

        $preference = ProfileMatchPreference::updateOrCreate(
            ['profile_id' => $profileId],
            $data
        );

        return response()->json($preference);
    }
}
