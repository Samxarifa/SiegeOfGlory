import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { checkIfUserExists } from '$lib/dbHandler.server';

export const load = (async (request: RequestEvent) => {
	// Checks User Is Logged In and not new user
	const token = request.cookies.get('token');
	let decodedToken;
	if (token) {
		try {
			decodedToken = await adminAuth.verifyIdToken(token);
		} catch {
			console.log('Dashboard Layout.ts: Old Token');
			redirect(303, '/');
		}
	}

	if (!decodedToken) {
		// Not logged in = redirect to login page
		redirect(303, '/');
	} else if (!(await checkIfUserExists(decodedToken.uid))) {
		// New User = redirect to new-user page
		redirect(303, '/new-user');
	}
}) satisfies LayoutServerLoad;
