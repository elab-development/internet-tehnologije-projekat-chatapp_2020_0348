<?php

namespace App\Http\Controllers;

use App\Http\Resources\Message\MessageCollection;
use App\Http\Resources\Message\MessageResource;
use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = Message::all();
        if (is_null($messages) || count($messages) === 0) {
            return response()->json('No messages found!', 404);
        }
        return response()->json([
            'messages' => new MessageCollection($messages)
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
            'text' => 'required|string|max:255|',
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

        $message = Message::create([
            'text' => $request->text,
            'user_id' => $request->user_id,
            'chat_id' => $request->chat_id,
        ]);

        return response()->json([
            'Message sent' => new MessageResource($message)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show($message_id)
    {
        $message = Message::find($message_id);
        if (is_null($message)) {
            return response()->json('Message not found', 404);
        }
        return response()->json([
            'message' => new MessageResource($message)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|string|max:255|',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $message->text = $request->text;

        return response()->json([
            'Message edited' => new MessageResource($message)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json('Message deleted');
    }
}
