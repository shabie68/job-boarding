<?php

namespace App\Broadcasting;

use App\Models\User;
use App\Models\Company;

class SubmissionChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\User  $user
     * @return array|bool
     */
    public function join(User $user, Company $company)
    {
        //
        return $user->recruiter_of === $user->name . '-' . $company->title;
    }
}
