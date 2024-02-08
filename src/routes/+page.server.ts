import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { adminAuth } from '$lib/firebase/firebase-admin.server';

export const load = (async (request: RequestEvent) => {
	const token = request.cookies.get('token');
	if (token) {
		try {
			await adminAuth.verifyIdToken(token);
		} catch {
			return {};
		}
		redirect(303, '/dashboard');
	} else {
		return {};
	}
}) satisfies PageServerLoad;
