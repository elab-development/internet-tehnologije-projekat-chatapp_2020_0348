<?php

namespace App\Http\Resources\UserChat;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserChatCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'userchats';

    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
