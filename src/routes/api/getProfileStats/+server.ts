import { getProfilePageStats } from '$lib/statHandler.server';
import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function GET(request: RequestEvent) {
	const r6Id = request.url.searchParams.get('r6Id');

	if (r6Id) {
		const r6Data = await getProfilePageStats(r6Id);

		if (r6Data) {
			return json(r6Data);
		}
	} else {
		return error(403, 'Forbidden');
	}
}
