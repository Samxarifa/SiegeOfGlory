import { getProfilePageStats } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async (request) => {
	// Gets UserId From URL
	const userId = request.params.userId;
	if (userId) {
		// Gets Stats For Profile Page
		const data = await getProfilePageStats(userId);
		if (data) {
			return data;
		} else {
			// Error 404 if user not found
			error(404, 'Not Found');
		}
	} else {
		error(400, 'Bad Request');
	}
}) satisfies PageServerLoad;
