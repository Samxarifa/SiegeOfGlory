import { checkIfUserExists, createUser } from '$lib/dbHandler.server';
import type { PageServerLoad } from './$types';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import { getPlayerIdByUsername } from '$lib/statHandler.server';

export const load = (async (request: RequestEvent) => {
	const uid = request.locals.userSession?.uid;

	if (!uid) {
		redirect(303, '/');
	} else if (await checkIfUserExists(uid)) {
		// Redirects to dashboard if not new user
		redirect(303, '/dashboard');
	}
}) satisfies PageServerLoad;

export const actions = {
	// Code to run on server when form is submitted
	register: async ({ locals, request }) => {
		// Get Form Data
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const platform = data.get('platform')?.toString();

		// Validates firebase auth
		const uid = locals.userSession?.uid;

		if (uid && username && platform) {
			let rainbowPlatform = platform;
			if (platform === 'ubi') {
				rainbowPlatform = 'uplay';
			}

			// Checks R6Account Exists
			const rainbowId = await getPlayerIdByUsername(username, rainbowPlatform);
			if (rainbowId) {
				if (
					// Creates DB entry for new account
					await createUser(uid, username.toUpperCase() + '#' + platform.toUpperCase(), rainbowId)
				) {
					// Changes Firebase username to r6 username + platform
					await adminAuth.updateUser(uid, {
						displayName: username.toUpperCase() + '#' + platform.toUpperCase()
					});
					// Redirects to dashboard when new user set up
					redirect(303, '/dashboard');
				} else {
					// Returns error to form page if r6 account already in use by SiegeOfGlory
					return { success: false, message: 'Rainbow Account Already Linked to SOG Account' };
				}
			} else {
				// Returns Error if R6 account doesn't exist on given platform
				return { success: false, message: "Rainbow Account Doesn't Exist" };
			}
		}
	}
} satisfies Actions;
