import { getProfilePageStats } from '$lib/dbHandler.server';
import { getProfilePageStats as getR6Stats } from '$lib/statHandler.server';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (request) => {
	// Gets User Uid from token
	const token = request.cookies.get('token');
	if (token) {
		try {
			const decodedToken = await adminAuth.verifyIdToken(token);
			// Gets Stats For Profile Page
			const dbData = await getProfilePageStats(decodedToken.uid);
			if (dbData) {
				const r6Data = await getR6Stats(dbData.rainbowId);
				return {
					sogData: dbData,
					r6Data
				};
			}
			// Sends them to +page.svelte
		} catch {
			// If not logged in / token expired = redirect to login page
			redirect(303, '/');
		}
	}
}) satisfies PageServerLoad;
