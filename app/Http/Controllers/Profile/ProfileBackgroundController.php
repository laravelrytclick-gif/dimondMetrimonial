<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ProfileBackground;
use App\Models\UserMasterProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileBackgroundController extends Controller
{
    /**
     * GET education / profession records of a profile
     */
    public function index($profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        // RM access control
        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        return response()->json(
            ProfileBackground::where('profile_id', $profileId)
                ->orderBy('year_from', 'desc')
                ->get()
        );
    }

    /**
     * ADD education / profession
     */
    public function store(Request $request, $profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $data = $request->validate([
            'type' => 'required|in:education,profession',
            'title' => 'required|string|max:120',
            'organization' => 'nullable|string|max:120',
            'specialization' => 'nullable|string|max:120',
            'location' => 'nullable|string|max:120',
            'year_from' => 'nullable|integer',
            'year_to' => 'nullable|integer',
            'income' => 'nullable|string|max:50',
        ]);

        $data['profile_id'] = $profileId;

        return response()->json(
            ProfileBackground::create($data),
            201
        );
    }

    /**
     * UPDATE education / profession
     */
    public function update(Request $request, $id)
    {
        $background = ProfileBackground::findOrFail($id);
        $profile = $background->profile;

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $background->update($request->all());

        return response()->json($background);
    }

    /**
     * DELETE education / profession
     */
    public function destroy($id)
    {
        $background = ProfileBackground::findOrFail($id);
        $profile = $background->profile;

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $background->delete();

        return response()->json([
            'message' => 'Background record deleted'
        ]);
    }
}
