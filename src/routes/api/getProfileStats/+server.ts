import { getProfilePageStats } from '$lib/statHandler.server';
import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function GET(request: RequestEvent) {
	const r6Id = request.url.searchParams.get('r6Id');

	if (r6Id) {
		const r6Data = await getProfilePageStats(r6Id);

		if (r6Data) {
			request.setHeaders({ 'Cache-Control': 'max-age=600' });
			return json(r6Data);
		} else {
			return error(404, 'R6 ID not found');
		}
	} else {
		return error(400, 'Missing R6 ID');
	}
}
