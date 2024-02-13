import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { adminAuth } from '$lib/firebase/firebase-admin.server';

export const load = (async (request: RequestEvent) => {
	// Get id set by API endpoint
	const token = request.cookies.get('token');
	if (token) {
		try {
			// Validate against firebase
			await adminAuth.verifyIdToken(token);
		} catch {
			return {};
		}
		// If validated (Logged In), redirect to dashboard
		redirect(303, '/dashboard');
	} else {
		return {};
	}
}) satisfies PageServerLoad;
