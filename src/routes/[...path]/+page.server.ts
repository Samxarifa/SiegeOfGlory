import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	// Return a 404 error for all routes that don't exist
	error(404);
};
