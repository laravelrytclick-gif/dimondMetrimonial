<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ProfileDispatchProposal;
use App\Models\UserMasterProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileDispatchProposalController extends Controller
{
    /**
     * GET proposals related to a profile
     */
    public function index($profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        // RM access check
        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        return response()->json(
            ProfileDispatchProposal::where('sender_profile_id', $profileId)
                ->orWhere('receiver_profile_id', $profileId)
                ->orderByDesc('sent_at')
                ->get()
        );
    }

    /**
     * SEND proposal
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'sender_profile_id' => 'required|integer',
            'receiver_profile_id' => 'required|integer',
            'medium' => 'required|in:email,whatsapp,manual',
            'side' => 'required|in:single,both',
            'proposal_status' => 'nullable|string|max:50',
        ]);

        // Access validation
        $senderProfile = UserMasterProfile::findOrFail($data['sender_profile_id']);

        if (Auth::user()->role === 'RM' && $senderProfile->rm_id !== Auth::id()) {
            abort(403);
        }

        $data['sent_by'] = Auth::id();
        $data['sent_at'] = now();

        return response()->json(
            ProfileDispatchProposal::create($data),
            201
        );
    }

    /**
     * UPDATE proposal status
     */
    public function update(Request $request, $id)
    {
        $proposal = ProfileDispatchProposal::findOrFail($id);
        $senderProfile = $proposal->senderProfile;

        if (Auth::user()->role === 'RM' && $senderProfile->rm_id !== Auth::id()) {
            abort(403);
        }

        $proposal->update(
            $request->validate([
                'proposal_status' => 'required|string|max:50',
            ])
        );

        return response()->json($proposal);
    }
}
