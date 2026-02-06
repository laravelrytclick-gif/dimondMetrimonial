<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ProfileMeeting;
use App\Models\UserMasterProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileMeetingController extends Controller
{
    /**
     * GET meetings of a profile
     */
    public function index($profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        // RM access control
        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        return response()->json(
            ProfileMeeting::where('profile_id', $profileId)
                ->orderBy('meeting_date')
                ->get()
        );
    }

    /**
     * SCHEDULE a meeting
     */
    public function store(Request $request, $profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $data = $request->validate([
            'matched_profile_id' => 'nullable|integer',
            'meeting_type' => 'required|in:family,individual',
            'meeting_date' => 'required|date',
            'meeting_time' => 'nullable',
            'venue' => 'nullable|string|max:120',
            'attendees' => 'nullable|array',
        ]);

        $data['profile_id'] = $profileId;
        $data['scheduled_by'] = Auth::id();
        $data['status'] = 'scheduled';

        return response()->json(
            ProfileMeeting::create($data),
            201
        );
    }

    /**
     * UPDATE meeting (status / outcome / next action)
     */
    public function update(Request $request, $id)
    {
        $meeting = ProfileMeeting::findOrFail($id);
        $profile = $meeting->profile;

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $meeting->update($request->validate([
            'status' => 'nullable|in:scheduled,completed,cancelled',
            'outcome' => 'nullable|string|max:100',
            'next_action_date' => 'nullable|date',
            'venue' => 'nullable|string|max:120',
            'attendees' => 'nullable|array',
            'meeting_date' => 'nullable|date',
            'meeting_time' => 'nullable',
        ]));

        return response()->json($meeting);
    }
}
