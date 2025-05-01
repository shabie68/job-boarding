<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */

    public $user;
    public $recep;
    public $message;
    public $totalNotifications;

    public function __construct($user, $request, $totalNotifications = null)
    {
        \Log::info("USER*******", ["CANDDIATE" => $request['user_id']]);
        $this->user = $user;
        $this->recep = $request['user_id'];
        $this->message = $request['message'];
        $this->totalNotifications = $totalNotifications;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('candidate.' . $this->recep);
    }

    public function broadcastAs()
    {
        return 'job-msg';
    }
}
