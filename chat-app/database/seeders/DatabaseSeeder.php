<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use App\Models\UserChat;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::truncate();
        Chat::truncate();
        UserChat::truncate();
        Message::truncate();

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();

        $chat1 = Chat::factory()->create();
        $chat2 = Chat::factory()->create();
        $chat3 = Chat::factory()->create();
        $chat4 = Chat::factory()->create();

        UserChat::factory()->create([
            'user_id' => $user1->id,
            'chat_id' => $chat1->id
        ]);
        UserChat::factory()->create([
            'user_id' => $user2->id,
            'chat_id' => $chat1->id
        ]);
        UserChat::factory()->create([
            'user_id' => $user1->id,
            'chat_id' => $chat2->id
        ]);
        UserChat::factory()->create([
            'user_id' => $user3->id,
            'chat_id' => $chat2->id
        ]);
        UserChat::factory()->create([
            'user_id' => $user3->id,
            'chat_id' => $chat3->id
        ]);
        UserChat::factory()->create([
            'user_id' => $user2->id,
            'chat_id' => $chat3->id
        ]);
        UserChat::factory()->create([
            'user_id' => $user1->id,
            'chat_id' => $chat4->id
        ]);
        UserChat::factory()->create([
            'user_id' => $user2->id,
            'chat_id' => $chat4->id
        ]);
        UserChat::factory()->create([
            'user_id' => $user3->id,
            'chat_id' => $chat4->id
        ]);

        Message::factory()->create([
            'user_id' => $user1->id,
            'chat_id' => $chat1->id,
        ]);
        Message::factory()->create([
            'user_id' => $user2->id,
            'chat_id' => $chat1->id,
        ]);
        Message::factory()->create([
            'user_id' => $user1->id,
            'chat_id' => $chat1->id,
        ]);

        Message::factory()->create([
            'user_id' => $user1->id,
            'chat_id' => $chat2->id,
        ]);
        Message::factory()->create([
            'user_id' => $user3->id,
            'chat_id' => $chat2->id,
        ]);
        Message::factory()->create([
            'user_id' => $user1->id,
            'chat_id' => $chat2->id,
        ]);

        Message::factory()->create([
            'user_id' => $user2->id,
            'chat_id' => $chat3->id,
        ]);
        Message::factory()->create([
            'user_id' => $user2->id,
            'chat_id' => $chat3->id,
        ]);
        Message::factory()->create([
            'user_id' => $user3->id,
            'chat_id' => $chat3->id,
        ]);


        Message::factory()->create([
            'user_id' => $user1->id,
            'chat_id' => $chat4->id,
        ]);
        Message::factory()->create([
            'user_id' => $user2->id,
            'chat_id' => $chat4->id,
        ]);
        Message::factory()->create([
            'user_id' => $user3->id,
            'chat_id' => $chat4->id,
        ]);
    }
}
