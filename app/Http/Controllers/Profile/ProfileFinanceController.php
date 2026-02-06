<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ProfileFinance;
use App\Models\UserMasterProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileFinanceController extends Controller
{
    /**
     * GET finance records of a profile (Admin only)
     */
    public function index($profileId)
    {
        if (Auth::user()->role !== 'Admin') {
            abort(403);
        }

        UserMasterProfile::findOrFail($profileId);

        return response()->json(
            ProfileFinance::where('profile_id', $profileId)
                ->orderByDesc('created_at')
                ->get()
        );
    }

    /**
     * ADD payment / membership (Admin only)
     */
    public function store(Request $request, $profileId)
    {
        if (Auth::user()->role !== 'Admin') {
            abort(403);
        }

        UserMasterProfile::findOrFail($profileId);

        $data = $request->validate([
            'package_name' => 'required|string|max:120',
            'amount_paid' => 'required|numeric|min:0',
            'payment_date' => 'nullable|date',
            'payment_mode' => 'nullable|in:Cash,UPI,Bank',
            'expiry_date' => 'nullable|date',
            'remarks' => 'nullable|string',
        ]);

        $data['profile_id'] = $profileId;
        $data['created_at'] = now();

        return response()->json(
            ProfileFinance::create($data),
            201
        );
    }
}
