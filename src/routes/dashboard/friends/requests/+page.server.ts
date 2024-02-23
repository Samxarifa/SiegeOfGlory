import { getRequests } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
	const uid = request.locals.userSession?.uid;
	if (uid) {
		const users = await getRequests(uid);
		return { users };
	}
}) satisfies PageServerLoad;
