import { adminAuth } from '$lib/firebase/firebase-admin.server';
import type { RequestEvent } from '@sveltejs/kit';

// Code run when API endpoint hit (/api/auth)
export async function POST(request: RequestEvent) {
	// Gets Token from request header
	const { token } = await request.request.json();

	if (token && token !== '') {
		const expiresIn = 60 * 60 * 24 * 5 * 1000;

		const sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn });

		request.cookies.set('session', sessionCookie, { path: '/', maxAge: expiresIn });
	} else {
		request.cookies.delete('session', { path: '/' });
	}
	return new Response();
}
