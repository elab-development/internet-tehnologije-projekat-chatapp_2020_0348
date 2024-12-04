<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    public function userChats()
    {
        return $this->hasMany(UserChat::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public static function getAllChats()
    {
        $result = DB::table('chats')
            ->select('id', 'name', 'description')
            ->get()->toArray();
        return $result;
    }
}
