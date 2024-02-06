import { adminAuth } from '$lib/firebase-admin.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(request: RequestEvent) {
	const { token } = await request.request.json();

	request.cookies.delete('token', { path: '/' });

	if (token && (await adminAuth.verifyIdToken(token))) {
		request.cookies.set('token', token, { path: '/' });
	}
	return new Response();
}
