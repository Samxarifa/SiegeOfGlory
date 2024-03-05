import { getFriends } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
	// Depends used with invalidate on client side to rerun this function when needed (Identifier)
	request.depends('get:friends');

	const uid = request.locals.userSession?.uid;
	if (uid) {
		// Gets List of Friends From db
		const friends = await getFriends(uid);
		return { friends };
	}
}) satisfies PageServerLoad;
