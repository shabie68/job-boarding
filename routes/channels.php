<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/



Broadcast::channel('company.{id}', function($user, $id) {
	\Log::info("MESS", ["ID****" => $id]);
	return $user->company ? $user->company->id == $id : -1 == 4;
});


Broadcast::channel('msg.{recepient}' , function($user, $recepient) {
	\Log::info("ID****", ["CHECKING" => (int) $recepient]);
	\Log::info("recepient", ["ID****" => 4 == $recepient]);
	return $user->id == $recepient;
});
