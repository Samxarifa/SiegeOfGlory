import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { adminAuth } from '$lib/firebase-admin.server';

export const load = (async (request: RequestEvent) => {
	const token = request.cookies.get('token');
	if (!token || !(await adminAuth.verifyIdToken(token))) {
		redirect(303, '/');
	} else {
		return {};
	}
}) satisfies LayoutServerLoad;
