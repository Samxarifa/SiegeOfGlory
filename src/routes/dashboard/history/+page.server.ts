import { getHistory } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
	const uid = request.locals.userSession?.uid;

	if (uid) {
		// Get battle history for the user
		const battles = await getHistory(uid);
		return { battles };
	}
}) satisfies PageServerLoad;
