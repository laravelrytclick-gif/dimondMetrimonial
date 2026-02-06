<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Profile\ProfileFamilyController;
use App\Http\Controllers\Admin\SystemAuditLogController;
use App\Http\Controllers\Communication\EmailLogController;
use App\Http\Controllers\Profile\ProfileAttachmentController;
use App\Http\Controllers\Profile\ProfileCallFollowupController;
use App\Http\Controllers\Profile\ProfileDispatchProposalController;
use App\Http\Controllers\Profile\ProfileFinanceController;
use App\Http\Controllers\Profile\ProfileMatchPreferenceController;
use App\Http\Controllers\Profile\ProfileMeetingController;
use App\Http\Controllers\Profile\ProfileStatusHistoryController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';



// Route::middleware(['auth', 'role:Admin'])->prefix('admin')->group(function () {
    Route::get('/audit-logs', [SystemAuditLogController::class, 'index']);
    Route::get('/audit-logs/{id}', [SystemAuditLogController::class, 'show']);

        // Profiles (Admin + RM)
    Route::get('/profiles', [ProfileController::class, 'index']);
    Route::post('/profiles', [ProfileController::class, 'store']);
    Route::get('/profiles/{id}', [ProfileController::class, 'show']);
    Route::put('/profiles/{id}', [ProfileController::class, 'update']);

    // Admin only
    Route::delete('/profiles/{id}', [ProfileController::class, 'destroy']);
    Route::put('/profiles/{id}/status', [ProfileController::class, 'changeStatus']);

      Route::get('/profiles/{profileId}/family', [ProfileFamilyController::class, 'index']);
    Route::post('/profiles/{profileId}/family', [ProfileFamilyController::class, 'store']);
    Route::put('/family/{id}', [ProfileFamilyController::class, 'update']);
    Route::delete('/family/{id}', [ProfileFamilyController::class, 'destroy']);


     Route::get('/profiles/{profileId}/preference', [ProfileMatchPreferenceController::class, 'show']);
    Route::post('/profiles/{profileId}/preference', [ProfileMatchPreferenceController::class, 'store']);


     Route::get('/profiles/{profileId}/calls', [ProfileCallFollowupController::class, 'index']);
    Route::post('/profiles/{profileId}/calls', [ProfileCallFollowupController::class, 'store']);

    Route::put('/calls/{id}', [ProfileCallFollowupController::class, 'update']);
    Route::delete('/calls/{id}', [ProfileCallFollowupController::class, 'destroy']);


    Route::get('/profiles/{profileId}/meetings', [ProfileMeetingController::class, 'index']);
    Route::post('/profiles/{profileId}/meetings', [ProfileMeetingController::class, 'store']);

    Route::put('/meetings/{id}', [ProfileMeetingController::class, 'update']);


      // Proposals
    Route::get('/profiles/{profileId}/proposals', [ProfileDispatchProposalController::class, 'index']);
    Route::post('/proposals/send', [ProfileDispatchProposalController::class, 'store']);

    Route::put('/proposals/{id}', [ProfileDispatchProposalController::class, 'update']);


    // Profile status history
    Route::get('/profiles/{profileId}/status-history', [ProfileStatusHistoryController::class, 'index']);

    // Admin only: change status
    Route::post('/profiles/{profileId}/status-history', [ProfileStatusHistoryController::class, 'store']);


       // Finance (Admin only)
    Route::get('/profiles/{profileId}/finance', [ProfileFinanceController::class, 'index']);
    Route::post('/profiles/{profileId}/finance', [ProfileFinanceController::class, 'store']);


        // Profile attachments
    Route::get('/profiles/{profileId}/attachments', [ProfileAttachmentController::class, 'index']);
    Route::post('/profiles/{profileId}/attachments', [ProfileAttachmentController::class, 'store']);
    Route::delete('/attachments/{id}', [ProfileAttachmentController::class, 'destroy']);


     // Email logs (ADMIN ONLY)
    Route::get('/email-logs', [EmailLogController::class, 'index']);
    Route::get('/email-logs/{id}', [EmailLogController::class, 'show']);

// });
