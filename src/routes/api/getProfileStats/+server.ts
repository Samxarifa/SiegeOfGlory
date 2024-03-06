import r6Cache from '$lib/r6Cache.server';
import { getProfilePageStats } from '$lib/statHandler.server';
import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function GET(request: RequestEvent) {
	// Gets R6Id From URL
	const r6Id = request.url.searchParams.get('r6Id');

	if (r6Id) {
		// Checks Cache
		const cache = r6Cache.get(r6Id);

		// If Item Is In Cache
		if (cache) {
			// Set Cache-Control Header to remaining TTL of cache
			const ttl = Math.round(r6Cache.getRemainingTTL(r6Id) / 1000);
			request.setHeaders({ 'Cache-Control': `max-age=${ttl}` });

			// Return Cached Data
			return json(cache);
		}

		// Else: Get Stats For Profile Page
		const r6Data = await getProfilePageStats(r6Id);

		// If Data Is Found
		if (r6Data) {
			const ttl = 60 * 60;

			// Add Data To Cache For 1 Hour
			r6Cache.set(r6Id, r6Data, {
				ttl: ttl * 1000
			});
			// Set Cache-Control Header to 1 Hour
			request.setHeaders({ 'Cache-Control': `max-age=${ttl}` });
			// Return Data
			return json(r6Data);
		} else {
			return error(404, 'R6 ID not found');
		}
	} else {
		return error(400, 'Missing R6 ID');
	}
}
