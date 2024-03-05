import r6Cache from '$lib/r6Cache.server';
import { getProfilePageStats } from '$lib/statHandler.server';
import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function GET(request: RequestEvent) {
	const r6Id = request.url.searchParams.get('r6Id');

	if (r6Id) {
		const cache = r6Cache.get(r6Id);

		if (cache) {
			const ttl = Math.round(r6Cache.getRemainingTTL(r6Id) / 1000);
			request.setHeaders({ 'Cache-Control': `max-age=${ttl}` });

			return json(cache);
		}

		const r6Data = await getProfilePageStats(r6Id);

		if (r6Data) {
			const ttl = 60 * 60;

			r6Cache.set(r6Id, r6Data, {
				ttl: ttl * 1000
			});
			request.setHeaders({ 'Cache-Control': `max-age=${ttl}` });
			return json(r6Data);
		} else {
			return error(404, 'R6 ID not found');
		}
	} else {
		return error(400, 'Missing R6 ID');
	}
}
