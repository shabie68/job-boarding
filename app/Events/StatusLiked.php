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
    public $name;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($name, $request)
    {
        $this->recepient = $request['id'];
        $this->name = $name;
        // $this->message  = "{$username} liked your status";
        $this->message = $request['message'];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('msg.' . $this->recepient);
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
