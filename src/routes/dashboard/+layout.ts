import type { LayoutLoad } from './$types';

export const load = (async (request) => {
	return { url: request.url.pathname };
}) satisfies LayoutLoad;
