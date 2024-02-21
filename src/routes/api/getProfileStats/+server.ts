import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { getProfilePageStats } from '$lib/statHandler.server';
import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function GET(request: RequestEvent) {
	const r6Id = request.url.searchParams.get('r6Id');
	const token = request.cookies.get('token');

	if (token && r6Id) {
		try {
			await adminAuth.verifyIdToken(token);

			const r6Data = await getProfilePageStats(r6Id);

			if (r6Data) {
				return json(r6Data);
			}
		} catch {
			return error(403, 'Forbidden');
		}
	} else {
		return error(403, 'Forbidden');
	}
}
