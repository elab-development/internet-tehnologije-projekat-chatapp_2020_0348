<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\UserAuth\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserChatController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/chats', [ChatController::class, 'index']);
Route::get('/chats/paginate', [ChatController::class, 'indexPaginate']);
Route::get('/chats/{id}', [ChatController::class, 'show']);

Route::get('/messages', [MessageController::class, 'index']);
Route::get('/messages/{id}', [MessageController::class, 'show']);

Route::get('/userchats', [UserChatController::class, 'index']);
Route::get('/userchats/{id}', [UserChatController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//novo
Route::middleware('auth:sanctum')->get('/list-users', [UserController::class, 'listUsers']);
Route::middleware('auth:sanctum')->get('/user-chats', [UserChatController::class, 'getUserChats']);
Route::middleware('auth:sanctum')->post('/start-chat', [ChatController::class, 'startChat']);
Route::post('/send-message', [ChatController::class, 'sendMessage'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/user-id', function (Request $request) {
    return response()->json(['user_id' => $request->user()->id]);
});

Route::get('/export-chat/{chatId}', [ChatController::class, 'exportChatToPDF']);

Route::post('/forgot-password', [AuthController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('auth:sanctum');



Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    Route::resource('/chats', ChatController::class)
    ->only(['store', 'update', 'destroy']);

    Route::resource('/messages', MessageController::class)
    ->only(['store', 'update', 'destroy']);

    Route::resource('/userchats', UserChatController::class)
    ->only(['store', 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});