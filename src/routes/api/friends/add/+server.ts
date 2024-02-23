import { sendFriendRequest } from '$lib/dbHandler.server';
import { error, type RequestEvent, json } from '@sveltejs/kit';

export async function POST(request: RequestEvent) {
	const { friendId } = await request.request.json();
	const uid = request.locals.userSession?.uid;

	if (uid && friendId) {
		const success = sendFriendRequest(uid, friendId);
		return json({
			success
		});
	} else {
		return error(403, 'Forbidden');
	}
}
