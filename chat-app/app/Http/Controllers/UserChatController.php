<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserChat\UserChatCollection;
use App\Http\Resources\UserChat\UserChatResource;
use App\Models\Chat;
use App\Models\User;
use App\Models\UserChat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserChatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userchats = UserChat::all();
        if (is_null($userchats) || count($userchats) === 0) {
            return response()->json('No user chats found!', 404);
        }
        return response()->json([
            'userchats' => new UserChatCollection($userchats)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'chat_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::find($request->user_id);
        if (is_null($user)) {
            return response()->json('User not found!', 404);
        }

        $chat = Chat::find($request->chat_id);
        if (is_null($chat)) {
            return response()->json('Chat not found!', 404);
        }

        $userchat = UserChat::create([
            'user_id' => $request->user_id,
            'chat_id' => $request->chat_id,
        ]);

        return response()->json([
            'UserChat created' => new UserChatResource($userchat)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserChat  $userChat
     * @return \Illuminate\Http\Response
     */
    public function show($userChat_id)
    {
        $userchat = UserChat::find($userChat_id);
        if (is_null($userchat)) {
            return response()->json('Userchat not found', 404);
        }
        return response()->json([
            'userchat' => new UserChatResource($userchat)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserChat  $userChat
     * @return \Illuminate\Http\Response
     */
    public function edit(UserChat $userChat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserChat  $userChat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserChat $userChat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserChat  $userChat
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserChat $userChat)
    {
        $userChat->delete();
        return response()->json('UserChat removed');
    }

    //novo
    public function getUserChats()
    {
        $user = auth()->user(); // Dohvata trenutno autentifikovanog korisnika

        // Pretpostavljamo da koristiš relacije za dohvatanje četova
        $chats = $user->chats()->with('messages')->get(); // 'chats' je relacija definisana u User modelu

        return response()->json([
            'chats' => $chats
        ]);
    }
}
