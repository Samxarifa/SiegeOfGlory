import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { startBattle } from '$lib/dbHandler.server';

export async function POST({ locals, request }: RequestEvent) {
	const uid = locals.userSession?.uid;
	const { friendId, statType } = await request.json();

	if (uid && friendId && statType) {
		if ((await startBattle(uid, friendId, statType)) === 1) {
			// If the battle was successfully started
			return json({ success: true });
		} else {
			// If there is already a battle
			return json({ success: false, message: 'There is already a battle' });
		}
	} else if (!statType) {
		// If the statType is not provided
		return json({ success: false, message: 'ST' });
	} else {
		// If the user is not logged in
		return json({ success: false, message: 'Forbidden' });
	}
}
