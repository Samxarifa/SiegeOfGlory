import { checkIfUserExists, createUser } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { getPlayerIdByUsername } from '$lib/statHandler.server';

export const load = (async (request: RequestEvent) => {
	const token = request.cookies.get('token');
	let decodedToken;
	if (token) {
		try {
			decodedToken = await adminAuth.verifyIdToken(token);
		} catch {
			redirect(303, '/');
		}
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
			try {
				decodedToken = await adminAuth.verifyIdToken(token);
			} catch {
				redirect(303, '/');
			}
		}

		if (decodedToken && username && platform) {
			let rainbowPlatform = platform;
			if (platform === 'ubi') {
				rainbowPlatform = 'uplay';
			}

			const rainbowId = await getPlayerIdByUsername(username, rainbowPlatform);
			if (rainbowId) {
				if (
					await createUser(decodedToken.uid, username + '#' + platform.toUpperCase(), rainbowId)
				) {
					adminAuth.updateUser(decodedToken.uid, {
						displayName: username + '#' + platform.toUpperCase()
					});
					redirect(303, '/dashboard');
				} else {
					return { success: false, message: 'Rainbow Account Already Linked to SOG Account' };
				}
			} else {
				return { success: false, message: "Rainbow Account Doesn't Exist" };
			}
		}
	}
};
