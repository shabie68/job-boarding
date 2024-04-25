<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use App\Models\User;
use App\Models\BoardJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendResume extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $candidate;
    protected $job;
    protected $file;

    public function __construct(User $user, BoardJob $job, $file)
    {
        $this->candidate = $user;
        $this->job = $job;
        $this->file = $file;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.resume')
                    ->attach($this->file)
                    ->with([

                        "job" => $this->job,
                        "candidate" => $this->candidate
                    ]);
    }
}
