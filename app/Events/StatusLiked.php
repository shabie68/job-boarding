<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\PrivateChannel;

class StatusLiked implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $recepient;

    public $message;
    public $userId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($userId, $recepient)
    {
        $this->recepient = $recepient;
        $this->userId = $userId;
        // $this->message  = "{$username} liked your status";
        // $this->message = $msg;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        // return ['my-channel-'.$this->username];
        // return ['msg.' . $this->username];
        \Log::info("CHANNEL NAME", ["channel " => new PrivateChannel('msg.' . $this->recepient)]);
        return new PrivateChannel('msg.' . $this->recepient);

        // return ['role-1'];

        // return ['role-2'];
    }

      /**
     * The event's broadcast name.
     */
    // public function broadcastAs(): string
    // {
    //     return 'StatusLiked';
    // }

       public function broadcastAs()
  {
      return 'msg-event';
  }
}
