<script lang="ts">
	import '../globals.css';

	import { auth, loading } from '$lib/firebase/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';

	// Sets config for NProgress (Navigation Progress Bar at Top of Page)
	NProgress.configure({
		// https://github.com/rstacruz/nprogress#configuration
		minimum: 0.2,
		showSpinner: false
	});

	// Watches for navigating changes and starts/stops NProgress
	$: {
		if ($navigating && $navigating.from?.url.pathname !== $navigating.to?.url.pathname) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	onMount(() => {
		detectSWUpdate();

		// If internet connection is lost, reload the page to show offline page cached by SW
		window.addEventListener('offline', () => {
			window.location.reload();
		});

		// Checks if logged in when first loaded and whenever auth status changes after
		const authListener = auth.onAuthStateChanged(async (user) => {
			loading.loading();

			let token;
			let location = $page.url.pathname + $page.url.search;
			// If logged in, send the jwt to server api endpoint and navigate from login page
			if (user) {
				token = await user.getIdToken();
				if ($page.url.pathname === '/') {
					// If page has redirect query, navigate to that page rather than dashboard
					location = `/${$page.url.searchParams.get('redirect')?.slice(1) || 'dashboard'}`;
				}
			} else {
				// Else navigate to login page
				token = '';
				if ($page.url.pathname !== '/') {
					location = '/';
				}
			}
			// Sends token to server to verify and create session, or delete session if token is empty
			await fetch('/api/auth', {
				method: 'POST',
				body: JSON.stringify({ token: token })
			});

			await goto(location);
			loading.loaded();
		});

		// Unsubscribes from auth listener when component is destroyed
		return () => authListener();
	});

	// Function to check if service worker has a new version
	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			// If update found, install new SW
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				// If installed, prompt user to reload to update
				if (newSW.state === 'installed') {
					if (confirm('New Update Available! Reload to update?')) {
						// Send message to SW to skip waiting and activate new SW
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}
</script>

<slot />
