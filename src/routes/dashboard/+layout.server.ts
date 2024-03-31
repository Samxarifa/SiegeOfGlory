import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { checkIfUserExists } from '$lib/dbHandler.server';

export const load = (async (request: RequestEvent) => {
	const uid = request.locals.userSession?.uid;

	// Checks User Is Logged In and not new user
	if (uid && !(await checkIfUserExists(uid))) {
		// New User = redirect to new-user page
		redirect(303, '/new-user');
	} else if (uid) {
		return {
			currentUser: uid,
			url: request.url.pathname
		};
	}
}) satisfies LayoutServerLoad;
