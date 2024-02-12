import { getHomePageStats } from '$lib/dbHandler.server';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
	const token = request.cookies.get('token');
	if (token) {
		try {
			const decodedToken = await adminAuth.verifyIdToken(token);
			const stats = await getHomePageStats(decodedToken.uid);
			return { stats };
		} catch {
			console.log('Dashboard +page.server: Token Expired');
			redirect(303, '/');
		}
	}
}) satisfies PageServerLoad;
