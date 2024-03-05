// File runs on server start

import { dev } from '$app/environment';
import { closePool } from '$lib/dbHandler.server';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { redirect } from '@sveltejs/kit';

// Event Listener: Close database pool on server exit
process.on('SIGINT', closePool);
process.on('SIGTERM', closePool);

// Function runs with every request to server
export async function handle({ event, resolve }) {
	// Get session from cookies
	const session = event.cookies.get('session');
	// If session cookie doesnt exist
	if (!session || session === '') {
		// If doesnt, set userSession local to undefined
		event.locals.userSession = undefined;
	} else {
		let decodedClaims = undefined;

		try {
			// Verify session cookie with firebase
			decodedClaims = await adminAuth.verifySessionCookie(session, false);
		} catch {
			// If fails, set userSession local to undefined
			event.locals.userSession = undefined;
		}

		// If succeded, but returned no user
		if (!decodedClaims) {
			// Set userSession local to undefined
			event.locals.userSession = undefined;
		} else {
			// Else set userSession local to user
			const { uid } = decodedClaims;
			event.locals.userSession = { uid };
		}
	}

	// If no user and nav to protected route
	if (
		!event.locals.userSession &&
		event.url.pathname !== '/' &&
		event.url.pathname !== '/api/auth'
	) {
		// Delete cookie (potential cleanup)
		event.cookies.delete('session', { path: '/', secure: !dev });

		// Gets the url of the page, and encodes it to be used as a redirect on login page
		const previousUrl = encodeURIComponent(event.url.pathname + event.url.search);

		// Redirect to login
		redirect(303, '/?redirect=' + previousUrl);
	}

	// Resolve handle hook
	const result = await resolve(event);

	return result;
}
