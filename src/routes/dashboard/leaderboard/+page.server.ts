import { getLeaderboard } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
	// Gets User Uid from token
	const uid = request.locals.userSession?.uid;
	if (uid) {
		const lb = await getLeaderboard(uid);
		return { lb };
	}
}) satisfies PageServerLoad;
