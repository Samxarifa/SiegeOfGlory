import { denyFriendRequest } from '$lib/dbHandler.server';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { error, type RequestEvent, json } from '@sveltejs/kit';

export async function POST(request: RequestEvent) {
	const { friendId } = await request.request.json();
	const token = request.cookies.get('token');

	if (token && friendId) {
		try {
			const decodedToken = await adminAuth.verifyIdToken(token);
			denyFriendRequest(decodedToken.uid, friendId);
			return json({
				success: true
			});
		} catch {
			return error(403, 'Forbidden');
		}
	} else {
		return error(403, 'Forbidden');
	}
}
