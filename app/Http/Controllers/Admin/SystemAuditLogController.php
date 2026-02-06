<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SystemAuditLog;
use Illuminate\Http\Request;

class SystemAuditLogController extends Controller
{
    // List logs
    public function index(Request $request)
    {
        $logs = SystemAuditLog::query()
            ->when($request->entity, fn ($q) =>
                $q->where('entity', $request->entity)
            )
            ->latest('created_at')
            ->paginate(20);

        return response()->json($logs);
    }

    // View single log
    public function show($id)
    {
        $log = SystemAuditLog::findOrFail($id);
        return response()->json($log);
    }
}
