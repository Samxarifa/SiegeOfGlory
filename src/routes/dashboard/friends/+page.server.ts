import { getFriends } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
	request.depends('get:friends');

	const uid = request.locals.userSession?.uid;
	if (uid) {
		const friends = await getFriends(uid);
		return { friends };
	}
}) satisfies PageServerLoad;
