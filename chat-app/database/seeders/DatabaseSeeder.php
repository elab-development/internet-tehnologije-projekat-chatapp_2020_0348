<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use App\Models\UserChat;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;



class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {   

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Message::truncate();
        UserChat::truncate();
        Chat::truncate();
        User::truncate();
        Role::truncate();


        $adminRole = Role::firstOrCreate(['name' => 'Administrator']);
        $userRole = Role::firstOrCreate(['name' => 'User']);
        $modRole = Role::firstOrCreate(['name' => 'Moderator']);


        // Kreiranje administratora
        $admin = User::firstOrCreate([
            'email' => 'admin@example.com'
        ], [
            'name' => 'Admin',
            'password' => Hash::make('admin123')
        ]);
    
        // Dodeljivanje uloge Administrator
        $admin->roles()->sync([$adminRole->id]);
        

         // Kreiranje moderatora
    $moderator = User::firstOrCreate([
        'email' => 'moderator@example.com'
    ], [
        'name' => 'Moderator',
        'password' => Hash::make('mod12345')
    ]);
    $moderator->roles()->sync([$modRole->id]);

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();
        $user1->roles()->attach($userRole);
        $user2->roles()->attach($userRole);
        $user3->roles()->attach($userRole);


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

       

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
