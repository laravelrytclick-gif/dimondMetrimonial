<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ProfileFamily;
use App\Models\UserMasterProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ProfileFamilyController extends Controller
{
    /**
     * Get family members of a profile
     */
    public function index($profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        // RM access control
        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        return response()->json(
            ProfileFamily::where('profile_id', $profileId)->get()
        );
    }

    /**
     * Add family member
     */
    public function store(Request $request, $profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $data = $request->validate([
            'member_type' => 'required|string',
            'name' => 'required|string|max:120',
            'age' => 'nullable|integer',
            'occupation' => 'nullable|string|max:120',
            'marital_status' => 'nullable|string|max:50',
            'living_with_candidate' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        $data['profile_id'] = $profileId;

        $family = ProfileFamily::create($data);

        return response()->json($family, 201);
    }

    /**
     * Update family member
     */
    public function update(Request $request, $id)
    {
        $family = ProfileFamily::findOrFail($id);
        $profile = $family->profile;

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $family->update($request->all());

        return response()->json($family);
    }

    /**
     * Delete family member
     */
    public function destroy($id)
    {
        $family = ProfileFamily::findOrFail($id);
        $profile = $family->profile;

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $family->delete();

        return response()->json(['message' => 'Family member removed']);
    }
}
