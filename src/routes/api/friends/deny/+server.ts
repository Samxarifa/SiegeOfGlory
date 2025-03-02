import { denyFriendRequest } from '$lib/dbHandler.server';
import { error, type RequestEvent, json } from '@sveltejs/kit';

// API route for denying friend requests
export async function POST(request: RequestEvent) {
	const { friendId } = await request.request.json();
	const uid = request.locals.userSession?.uid;

	if (uid && friendId) {
		denyFriendRequest(uid, friendId);
		return json({
			success: true
		});
	} else {
		return error(403, 'Forbidden');
	}
}
