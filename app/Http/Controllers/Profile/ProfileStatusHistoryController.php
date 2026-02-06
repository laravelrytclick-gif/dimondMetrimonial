<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ProfileStatusHistory;
use App\Models\UserMasterProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileStatusHistoryController extends Controller
{
    /**
     * GET status history of a profile
     */
    public function index($profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        // RM access check
        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        return response()->json(
            ProfileStatusHistory::where('profile_id', $profileId)
                ->orderByDesc('changed_at')
                ->get()
        );
    }

    /**
     * ADD status change entry
     * (Usually called when profile status is updated)
     */
    public function store(Request $request, $profileId)
    {
        // Only Admin can change lifecycle status
        if (Auth::user()->role !== 'Admin') {
            abort(403);
        }

        $profile = UserMasterProfile::findOrFail($profileId);

        $data = $request->validate([
            'new_status' => 'required|string|max:30',
            'reason' => 'nullable|string',
        ]);

        $history = ProfileStatusHistory::create([
            'profile_id' => $profileId,
            'old_status' => $profile->status,
            'new_status' => $data['new_status'],
            'changed_by' => Auth::id(),
            'reason' => $data['reason'] ?? null,
            'changed_at' => now(),
        ]);

        // Update master profile status
        $profile->update([
            'status' => $data['new_status'],
        ]);

        return response()->json($history, 201);
    }
}
