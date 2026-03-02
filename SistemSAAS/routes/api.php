<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API running'
    ]);
});

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
