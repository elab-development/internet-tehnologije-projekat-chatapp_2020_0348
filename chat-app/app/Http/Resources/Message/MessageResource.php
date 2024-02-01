<?php

namespace App\Http\Resources\Message;

use App\Http\Resources\Chat\ChatResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'message';

    public function toArray($request)
    {
        return [
            'text' => $this->resource->text,
            'sent by' => new UserResource($this->resource->user),
            'at' => $this->resource->created_at,
            'in chat' => new ChatResource($this->resource->chat),
        ];
    }
}
