<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\BoardJob;

class ConfirmApplication extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $candidate;
    public $job;
    public function __construct(User $user, BoardJob $job)
    {
        //
        $this->candidate = $user;
        $this->job = $job;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // return $this->view('view.name');
        return $this->from('test@gmail.com')
                    ->view('mail.confirmation')
                    ->with([
                        "candidate" => $this->candidate,
                        "job" => $this->job
                    ]);
    }
}
