<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ProfileCallFollowup;
use App\Models\UserMasterProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileCallFollowupController extends Controller
{
    /**
     * GET call & follow-up history of a profile
     */
    public function index($profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        // RM access check
        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        return response()->json(
            ProfileCallFollowup::where('profile_id', $profileId)
                ->orderByDesc('created_at')
                ->get()
        );
    }

    /**
     * LOG a call / follow-up
     */
    public function store(Request $request, $profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $data = $request->validate([
            'call_type' => 'required|in:call,whatsapp,visit',
            'call_status' => 'nullable|string|max:50',
            'remarks' => 'nullable|string',
            'followup_date' => 'nullable|date',
        ]);

        $data['profile_id'] = $profileId;
        $data['performed_by'] = Auth::id();

        return response()->json(
            ProfileCallFollowup::create($data),
            201
        );
    }

    /**
     * UPDATE a call / follow-up
     */
    public function update(Request $request, $id)
    {
        $call = ProfileCallFollowup::findOrFail($id);
        $profile = $call->profile;

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $call->update($request->all());

        return response()->json($call);
    }

    /**
     * DELETE a call / follow-up
     */
    public function destroy($id)
    {
        $call = ProfileCallFollowup::findOrFail($id);
        $profile = $call->profile;

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $call->delete();

        return response()->json([
            'message' => 'Call / follow-up deleted'
        ]);
    }
}
