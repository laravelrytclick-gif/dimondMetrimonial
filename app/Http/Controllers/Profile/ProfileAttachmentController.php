<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ProfileAttachment;
use App\Models\UserMasterProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileAttachmentController extends Controller
{
    /**
     * GET all attachments of a profile
     */
    public function index($profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        // RM access control
        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        return response()->json(
            ProfileAttachment::where('profile_id', $profileId)
                ->orderByDesc('created_at')
                ->get()
        );
    }

    /**
     * UPLOAD attachment (photo / biodata / id)
     */
    public function store(Request $request, $profileId)
    {
        $profile = UserMasterProfile::findOrFail($profileId);

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        $data = $request->validate([
            'category' => 'required|in:photo,biodata,id',
            'file' => 'required|file|max:5120', // 5MB
            'meta' => 'nullable|array',
        ]);

        $file = $request->file('file');

        $path = $file->store(
            "profiles/{$profileId}/{$data['category']}",
            'public'
        );

        $attachment = ProfileAttachment::create([
            'profile_id' => $profileId,
            'category' => $data['category'],
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'meta' => $data['meta'] ?? null,
            'uploaded_by' => Auth::id(),
            'created_at' => now(),
        ]);

        return response()->json($attachment, 201);
    }

    /**
     * DELETE attachment
     */
    public function destroy($id)
    {
        $attachment = ProfileAttachment::findOrFail($id);
        $profile = $attachment->profile;

        if (Auth::user()->role === 'RM' && $profile->rm_id !== Auth::id()) {
            abort(403);
        }

        // Delete file from storage
        Storage::disk('public')->delete($attachment->file_path);

        $attachment->delete();

        return response()->json([
            'message' => 'Attachment deleted'
        ]);
    }
}
