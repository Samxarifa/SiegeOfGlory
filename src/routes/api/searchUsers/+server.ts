import { getAllUsers, type AllUserReturn } from '$lib/dbHandler.server';
import { adminAuth } from '$lib/firebase/firebase-admin.server';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import Fuse from 'fuse.js';

let dbData: AllUserReturn[];
let fuse: Fuse<AllUserReturn>;
let dataExpire: number;

async function updateData(uid: string) {
	if (dataExpire <= new Date().getTime() || !dbData || !fuse || !dataExpire) {
		dbData = await getAllUsers(uid);
		dataExpire = new Date().getTime() + 60 * 1000;
		fuse = new Fuse(dbData, {
			keys: ['username']
		});
	}
}

export async function GET(request: RequestEvent) {
	const searchQ = request.url.searchParams.get('searchQ');
	const token = request.cookies.get('token');

	if (token && searchQ) {
		try {
			const decodedToken = await adminAuth.verifyIdToken(token);
			await updateData(decodedToken.uid);

			const results = fuse.search(searchQ.toLowerCase());

			return json(results);
		} catch {
			return error(403, 'Forbidden');
		}
	} else {
		return error(403, 'Forbidden');
	}
}
