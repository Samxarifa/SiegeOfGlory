/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

// Get Static Files and Version from SvelteKit (Version used to generate a new name for new cache)
import { files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...files];

// Runs when the service worker is first installed
self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	// Adds all static files to cache
	event.waitUntil(addFilesToCache());
});

// Runs when the service worker is activated
self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) {
				await caches.delete(key);
			}
		}
	}

	// Deletes old stale caches when new cache is activated
	event.waitUntil(deleteOldCaches());
});

// Runs with every fetch request made by the app
self.addEventListener('fetch', (event) => {
	// Ignores non-GET requests
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);

		// Trys to get the response from the network
		try {
			const response = await fetch(event.request);
			return response;
		} catch {
			// If the network request fails, it will try to get the offline static item from cache
			const cache = await caches.open(CACHE);
			let cachedResponse;
			// If item in cache, return it from cache
			if (ASSETS.includes(url.pathname)) {
				cachedResponse = await cache.match(url.pathname);
			} else {
				// Else, return the offline page from cache
				cachedResponse = await cache.match('offline.html');
			}
			// If cachedResponse, return it
			if (cachedResponse) {
				return cachedResponse;
			}
		}
		// If all else fails, it will return a 404 page
		return new Response('Not Found', { status: 404 });
	}
	// Runs above function and responds to the fetch with the result
	event.respondWith(respond());
});

// Updates the service worker to new version when SKIP_WAITING message is received
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
