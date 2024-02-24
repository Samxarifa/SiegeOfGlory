import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');
	if (!session || session === '') {
		event.locals.userSession = undefined;
	} else {
		let decodedClaims = undefined;

		try {
			decodedClaims = await adminAuth.verifySessionCookie(session, true);
		} catch {
			event.locals.userSession = undefined;
		}

		if (!decodedClaims) {
			event.locals.userSession = undefined;
		} else {
			const { uid } = decodedClaims;
			event.locals.userSession = { uid };
		}
	}

	if (
		event.url.pathname !== '/' &&
		!event.locals.userSession &&
		event.url.pathname !== '/api/auth'
	) {
		event.cookies.delete('session', { path: '/' });
		redirect(303, '/');
	}

	const result = await resolve(event);

	return result;
}
