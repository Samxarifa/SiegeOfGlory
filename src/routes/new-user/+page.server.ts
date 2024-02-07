import { checkIfUserExists, createUser } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export const load = (async (request: RequestEvent) => {
	const token = request.cookies.get('token');
	let decodedToken;
	if (token) {
		decodedToken = await adminAuth.verifyIdToken(token);
	}

	if (!decodedToken) {
		redirect(303, '/');
	} else if (await checkIfUserExists(decodedToken.uid)) {
		redirect(303, '/dashboard');
	}
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const platform = data.get('platform')?.toString();

		const token = cookies.get('token');
		let decodedToken;
		if (token) {
			decodedToken = await adminAuth.verifyIdToken(token);
		}

		if (!decodedToken) {
			redirect(303, '/');
		} else if (username && platform) {
			await createUser(decodedToken.uid, username, platform);
			adminAuth.updateUser(decodedToken.uid, {
				displayName: username + platform.toUpperCase()
			});
			redirect(303, '/dashboard');
		}
	}
};
