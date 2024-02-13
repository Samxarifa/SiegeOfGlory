import { adminAuth } from '$lib/firebase/firebase-admin.server';
import type { RequestEvent } from '@sveltejs/kit';

// Code run when API endpoint hit (/api/auth)
export async function POST(request: RequestEvent) {
	// Gets Token from request header
	const { token } = await request.request.json();

	// Deletes the previous token set
	request.cookies.delete('token', { path: '/' });

	if (token && (await adminAuth.verifyIdToken(token))) {
		// Sets new token if exists and is valid
		request.cookies.set('token', token, { path: '/' });
	}
	return new Response();
}
