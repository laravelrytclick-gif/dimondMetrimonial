<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('login', function () {
    return Inertia::render('custom-login');
})->name('login');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('admin-dashboard', function () {
    return Inertia::render('admin-dashboard');
})->name('admin.dashboard');

Route::get('rm-dashboard', function () {
    return Inertia::render('rm-dashboard');
})->name('rm.dashboard');

Route::get('general-dashboard', function () {
    return Inertia::render('general-dashboard');
})->name('general.dashboard');

Route::get('profiles', function () {
    return Inertia::render('profiles');
})->name('profiles');

Route::get('add-profile', function () {
    return Inertia::render('add-profile');
})->name('add-profile');

Route::get('profiles/{id}', function ($id) {
    return Inertia::render('profile-detail', ['profileId' => $id]);
})->name('profile.detail');

require __DIR__.'/settings.php';