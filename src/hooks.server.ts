import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { redirect } from '@sveltejs/kit';

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
		event.cookies.delete('session', { path: '/' });
		// Redirect to login
		redirect(303, '/');
	}

	// Resolve handle hook
	const result = await resolve(event);

	return result;
}
