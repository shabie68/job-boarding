<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotifications() {

    	$notifications = Notification::where('user_id', auth()->user()->id)->paginate(10);

    	$unread_notifications = Notification::where('is_read', false)->where('user_id', auth()->user()->id)->get();

		$ids =  $unread_notifications->pluck('id')->toArray();

        $unread_notifications = Notification::whereIn('id', $ids)
                    ->update(['is_read' => true]);


    	return response()->json([
			"notifications" => $notifications
    	]);
    }

    public function getUnreadNotifications() {
        $notifications = Notification::where('user_id', auth()->user()->id)
                                        ->where('is_read', false)
                                        ->count();

        if($notifications > 0) {
            return response()->json([
                "total_notifications" => $notifications
            ]);    
        }

        
    }
}
