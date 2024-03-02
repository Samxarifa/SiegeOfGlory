import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { startBattle } from '$lib/dbHandler.server';

export async function POST({ locals, request }: RequestEvent) {
	const uid = locals.userSession?.uid;
	const { friendId, statType } = await request.json();

	if (uid && friendId && statType) {
		if ((await startBattle(uid, friendId, statType)) === 1) {
			return json({ success: true });
		} else {
			return json({ success: false, message: 'There is already a battle' });
		}
	} else if (!statType) {
		return json({ success: false, message: 'Please Select a Stat Type' });
	} else {
		return json({ success: false, message: 'Forbidden' });
	}
}
