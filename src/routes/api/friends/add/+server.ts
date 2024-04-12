import { sendFriendRequest } from '$lib/dbHandler.server';
import { error, type RequestEvent, json } from '@sveltejs/kit';

// API route for sending/accepting friend requests
export async function POST(request: RequestEvent) {
	// Get the friendId from the request body
	const { friendId } = await request.request.json();
	// Get the uid from the user session
	const uid = request.locals.userSession?.uid;

	if (uid && friendId) {
		const success = sendFriendRequest(uid, friendId);
		return json({
			success
		});
	} else {
		// Return a 403 error if the user is not logged in
		return error(403, 'Forbidden');
	}
}
