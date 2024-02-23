import { getAllUsers } from '$lib/dbHandler.server';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import Fuse from 'fuse.js';

export async function GET(request: RequestEvent) {
	const searchQ = request.url.searchParams.get('searchQ');
	const uid = request.locals.userSession?.uid;

	if (uid && searchQ) {
		const dbData = await getAllUsers(uid);
		const fuse = new Fuse(dbData, {
			keys: ['username']
		});

		const results = fuse.search(searchQ.toLowerCase());

		return json(results);
	} else {
		return error(403, 'Forbidden');
	}
}
