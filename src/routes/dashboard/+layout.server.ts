import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { checkIfUserExists } from '$lib/dbHandler.server';

export const load = (async (request: RequestEvent) => {
	const token = request.cookies.get('token');
	let decodedToken;
	if (token) {
		try {
			decodedToken = await adminAuth.verifyIdToken(token);
		} catch {
			console.log('Old Token');
			redirect(303, '/');
		}
	}

	if (!decodedToken) {
		redirect(303, '/');
	} else if (!(await checkIfUserExists(decodedToken.uid))) {
		redirect(303, '/new-user');
	}
}) satisfies LayoutServerLoad;
