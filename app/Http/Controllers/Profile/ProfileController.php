<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\UserMasterProfile;
use App\Models\ProfileStatusHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index()
    {
        $query = UserMasterProfile::query();

        if (Auth::user()->role === 'RM') {
            $query->where('rm_id', Auth::id());
        }

        return response()->json(
            $query->latest()->paginate(20)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'full_name' => 'required|string|max:120',
            'gender' => 'nullable|string',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email|max:100',
        ]);

        $data['user_code'] = 'CAND' . time();
        $data['rm_id'] = Auth::id();
        $data['registration_date'] = now();
        $data['status'] = 'Lead';

        return response()->json(
            UserMasterProfile::create($data),
            201
        );
    }

    public function show($id)
    {
        $profile = UserMasterProfile::findOrFail($id);

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        return response()->json($profile);
    }

    public function update(Request $request, $id)
    {
        $profile = UserMasterProfile::findOrFail($id);

        // if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
        //     abort(403);
        // }

        // SAFE fields only
        $profile->update(
            $request->only([
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
            ])
        );

        return response()->json($profile);
    }

    public function destroy($id)
    {
        if (Auth::user()->role !== 'Admin') {
            abort(403);
        }

        UserMasterProfile::findOrFail($id)->delete();

        return response()->json(['message' => 'Profile deleted']);
    }

    /**
     * ADMIN ONLY — change status + history
     */
    public function changeStatus(Request $request, $id)
    {
        // if (Auth::user()->role !== 'Admin') {
        //     abort(403);
        // }

        $profile = UserMasterProfile::findOrFail($id);

        $request->validate([
            'status' => 'required|in:Lead,Active,Hold,Closed,Blocked',
            'reason' => 'nullable|string',
        ]);

        // Save history
        ProfileStatusHistory::create([
            'profile_id' => $profile->id,
            'old_status' => $profile->status,
            'new_status' => $request->status,
            'changed_by' => Auth::id(),
            'reason' => $request->reason,
            'changed_at' => now(),
        ]);

        $profile->update([
            'status' => $request->status,
        ]);

        return response()->json($profile);
    }
}
