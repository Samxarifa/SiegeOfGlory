import { getRequests } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
	const uid = request.locals.userSession?.uid;
	if (uid) {
		// Gets All friend requests for the user
		const users = await getRequests(uid);
		return { users };
	}
}) satisfies PageServerLoad;
