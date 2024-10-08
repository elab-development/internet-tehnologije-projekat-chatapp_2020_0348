<?php

namespace App\Http\Controllers;

use App\Exports\ChatExport;
use App\Http\Resources\Chat\ChatCollection;
use App\Http\Resources\Chat\ChatResource;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use CSV;
use App\Models\User;  
use App\Models\UserChat;
use App\Models\Message;
use Barryvdh\DomPDF\Facade\Pdf;


class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chats = Chat::all();
        if (is_null($chats) || count($chats) === 0) {
            return response()->json('No chats found!', 404);
        }
        return response()->json([
            'chats' => new ChatCollection($chats)
        ]);
    }

    public function indexPaginate()
    {
        $chats = Chat::all();
        $chats = Chat::paginate(5);
        if (is_null($chats) || count($chats) === 0) {
            return response()->json('No chats found!', 404);
        }
        return response()->json([
            'chats' => new ChatCollection($chats)
        ]);
    }

    public function exportCSV()
    {
        return CSV::download(new ChatExport, 'chats.csv');
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
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255|unique:chats',
                'description' => 'required|string|max:255',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $chat = Chat::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json([
            'Chat created' => new ChatResource($chat)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function show($chat_id)
    {
        $chat = Chat::find($chat_id);
        if (is_null($chat)) {
            return response()->json('Chat not found', 404);
        }
        return response()->json([
            'chat' => new ChatResource($chat)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function edit(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chat $chat)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:255',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $chat->name = $request->name;
        $chat->name = $request->name;
        $chat->save();

        return response()->json([
            'Chat created' => new ChatResource($chat)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chat $chat)
    {
        $chat->delete();
        return response()->json('Chat deleted');
    }

   //novo
   public function startChat(Request $request) {
    $currentUser = auth()->user();
    $otherUserId = $request->input('user_id');
    $otherUser = User::find($otherUserId);

    if (!$otherUser) {
        return response()->json(['error' => 'Other user not found'], 404);
    }

    // Kreiranje novog četa
    $chat = Chat::create([
        'name' => 'Chat between ' . $currentUser->name . ' and ' . $otherUser->name,
        'description' => 'Private chat'
    ]);

    // Provera postojanja i upisivanje ulogovanog korisnika u novokreirani čet
    $userChatCurrentUser = new UserChat([
        'user_id' => $currentUser->id,
        'chat_id' => $chat->id
    ]);
    $userChatCurrentUser->save();

    // Provera postojanja i upisivanje drugog korisnika u čet
    $userChatOtherUser = new UserChat([
        'user_id' => $otherUser->id,  // Ovde koristimo $otherUser->id jer smo već proverili da $otherUser postoji
        'chat_id' => $chat->id
    ]);
    $userChatOtherUser->save();

    return response()->json(['chat' => $chat], 201);
}

public function sendMessage(Request $request)
{
    $request->validate([
        'text' => 'required|string',
        'chat_id' => 'required|integer|exists:chats,id',
    ]);

    $message = new Message([
        'text' => $request->text,
        'user_id' => auth()->id(),
        'chat_id' => $request->chat_id,
    ]);

    $message->save();

    return response()->json(['message' => $message], 201);
}


public function exportChatToPDF($chatId)
{
    $chat = Chat::with('messages')->findOrFail($chatId);
    $pdf = PDF::loadView('pdf.chat', ['chat' => $chat]);
    return $pdf->download('chat-' . $chat->name . '.pdf');
}


}

