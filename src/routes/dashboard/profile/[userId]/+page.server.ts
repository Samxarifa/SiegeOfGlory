import { getProfilePageStats } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async (request) => {
	// Gets User Uid from token
	const userId = request.params.userId;
	if (userId) {
		// Gets Stats For Profile Page
		const data = await getProfilePageStats(userId);
		if (data) {
			return data;
		} else {
			error(404);
		}
	} else {
		error(404);
	}
}) satisfies PageServerLoad;
