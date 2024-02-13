import { getHomePageStats } from '$lib/dbHandler.server';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
	// Gets User Uid from token
	const token = request.cookies.get('token');
	if (token) {
		try {
			const decodedToken = await adminAuth.verifyIdToken(token);
			// Gets Stats For Home Page
			const stats = await getHomePageStats(decodedToken.uid);
			// Sends them to +page.svelte
			return { stats };
		} catch {
			console.log('Dashboard +page.server: Token Expired');
			// If not logged in / token expired = redirect to login page
			redirect(303, '/');
		}
	}
}) satisfies PageServerLoad;
