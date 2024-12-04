<?php

namespace App\Http\Resources\UserChat;

use App\Http\Resources\Chat\ChatResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'userchat';

    public function toArray($request)
    {
        return [
            'user' => new UserResource($this->resource->user),
            'chat' => new ChatResource($this->resource->chat),
        ];
    }
}
