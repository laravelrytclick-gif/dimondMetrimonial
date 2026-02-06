<?php

namespace App\Http\Controllers\Communication;

use App\Http\Controllers\Controller;
use App\Models\EmailLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmailLogController extends Controller
{
    /**
     * GET all email logs (ADMIN ONLY)
     */
    public function index(Request $request)
    {
        if (Auth::user()->role !== 'Admin') {
            abort(403, 'Only Admin can view email logs');
        }

        $query = EmailLog::query();

        // Optional filters
        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->to_email) {
            $query->where('to_email', $request->to_email);
        }

        return response()->json(
            $query->orderByDesc('sent_at')->paginate(20)
        );
    }

    /**
     * GET single email log (ADMIN ONLY)
     */
    public function show($id)
    {
        if (Auth::user()->role !== 'Admin') {
            abort(403);
        }

        return response()->json(
            EmailLog::findOrFail($id)
        );
    }
}
