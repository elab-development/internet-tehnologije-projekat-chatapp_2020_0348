<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        if (is_null($users) || count($users) === 0) {
            return response()->json('No users found!', 404);
        }
        return response()->json([
            'users' => new UserCollection($users)
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($user_id)
    {
        $user = User::find($user_id);
        if (is_null($user)) {
            return response()->json('User not found', 404);
        }
        return response()->json([
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
{
    $user = User::find($id);

    // Opciono: Provera da li je trenutni korisnik administrator
    if (!auth()->user()->can('delete', $user)) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    if ($user) {
        $user->delete();
        return response()->json(['message' => 'User successfully deleted']);
    }

    return response()->json(['message' => 'User not found'], 404);
}


    //novo
    public function listUsers()
{
    $users = User::all(); // Dohvatanje svih korisnika iz baze
    return response()->json($users, 200);
}
}
