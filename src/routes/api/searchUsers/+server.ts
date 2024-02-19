import { getAllUsers } from '$lib/dbHandler.server';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import Fuse from 'fuse.js';

export async function GET(request: RequestEvent) {
	const searchQ = request.url.searchParams.get('searchQ');
	const token = request.cookies.get('token');

	if (token && searchQ) {
		try {
			const decodedToken = await adminAuth.verifyIdToken(token);
			const dbData = await getAllUsers(decodedToken.uid);
			const fuse = new Fuse(dbData, {
				keys: ['username'],
				isCaseSensitive: false
			});

			const results = fuse.search(searchQ.toLowerCase());

			return json(results);
		} catch {
			return error(403, 'Forbidden');
		}
	} else {
		return error(403, 'Forbidden');
	}
}
