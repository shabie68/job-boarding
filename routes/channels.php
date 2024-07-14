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

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

// Broadcast::channel('private-my-channel', function ($user, $userId) {
//   return $user->id === 1;
// });
// Broadcast::channel('private-my-channel', function ($user) {
//     return true;
// });


// Broadcast::channel('my-channel', function ($user, $companyId) {


//   // return $user->name === 'Admin';
// 	return $user->recruiter_of === $user->name . '-' . Company::find($companyId)->first()->title;
// 	// return $user->recruiter_of === $user->name . '-' . ($user->company ? $user->company->title : 'dummy');
// 	// return $user->role < 2;
// 	// return auth()->user()->role > 1;
// });

Broadcast::channel('company.{id}', function($user, $id) {
	\Log::info("MESS", ["ID****" => $id]);
	return $user->company ? $user->company->id == $id : -1 == 4;
});


Broadcast::channel('msg.{recepient}' , function($user, $recepient) {
	\Log::info("ID****", ["CHECKING" => (int) $recepient]);
	\Log::info("recepient", ["ID****" => 4 == $recepient]);
	return $user->id == $recepient;
});


// Broadcast::channel('user.{userId}', function ($user, $userId) {
//   if ($user->id === 1) {
//     return array('name' => $user->name);
//   }
// });


// Broadcast::channel('my-channel', function ($user, $id) {
//     return (int) $user->name === 'Admin';
// });
