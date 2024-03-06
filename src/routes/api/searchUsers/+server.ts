import { getAllUsers } from '$lib/dbHandler.server';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import Fuse from 'fuse.js';

export async function GET(request: RequestEvent) {
	const searchQ = request.url.searchParams.get('searchQ');
	const uid = request.locals.userSession?.uid;

	if (uid && searchQ) {
		const dbData = await getAllUsers(uid);
		// Uses fuse.js to search for users in list of users
		const fuse = new Fuse(dbData, {
			keys: ['username']
		});

		const results = fuse.search(searchQ.toLowerCase());

		// Returns the results
		return json(results);
	} else if (!uid) {
		// Returns Forbidden query if user is not logged in
		return error(403, 'Forbidden');
	} else {
		// Returns Bad Request if no search query is provided
		return error(400, 'Bad Request');
	}
}
