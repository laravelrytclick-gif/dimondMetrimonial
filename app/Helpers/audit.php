<?php
use Illuminate\Support\Facades\Auth;
use App\Models\SystemAuditLog;

if (! function_exists('audit_log')) {
    function audit_log(
        string $entity,
        ?int $entityId,
        string $action,
        ?array $oldData = null,
        ?array $newData = null
    ): void {
        SystemAuditLog::create([
            'entity'        => $entity,
            'entity_id'     => $entityId,
            'action'        => $action,
            'old_data'      => $oldData,
            'new_data'      => $newData,
           'performed_by' => Auth::check() ? Auth::id() : null,

            'ip_address'    => request()->ip(),
            'created_at'    => now(),
        ]);
    }
}
