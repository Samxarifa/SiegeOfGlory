import { adminAuth } from '$lib/firebase/firebase-admin.server';
import type { RequestEvent } from '@sveltejs/kit';

// Code run when API endpoint hit (/api/auth)
export async function POST(request: RequestEvent) {
	// Gets Token from request header
	const { token } = await request.request.json();

	// If token exists
	if (token && token !== '') {
		// Set cookie expire to 5 days
		const expiresIn = 60 * 60 * 24 * 5 * 1000;
		// Create session cookie from firebase
		const sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn });
		// Set the session cookie at path /
		request.cookies.set('session', sessionCookie, { path: '/', maxAge: expiresIn / 1000 });
	} else {
		// Delete the session cookie at path /
		request.cookies.delete('session', { path: '/' });
	}
	return new Response();
}
