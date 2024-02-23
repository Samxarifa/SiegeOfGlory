import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { checkIfUserExists } from '$lib/dbHandler.server';

export const load = (async (request: RequestEvent) => {
	// Checks User Is Logged In and not new user
	const uid = request.locals.userSession?.uid;

	if (uid && !(await checkIfUserExists(uid))) {
		// New User = redirect to new-user page
		redirect(303, '/new-user');
	}
}) satisfies LayoutServerLoad;
