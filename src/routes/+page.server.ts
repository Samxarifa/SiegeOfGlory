import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (request: RequestEvent) => {
	// Get id set by API endpoint
	const uid = request.locals.userSession?.uid;
	if (uid) {
		// If validated (Logged In), redirect to dashboard
		redirect(303, '/dashboard');
	} else {
		// Else, do nothing
		return {};
	}
}) satisfies PageServerLoad;
