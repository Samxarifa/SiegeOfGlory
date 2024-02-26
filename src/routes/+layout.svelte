<script lang="ts">
	import '../globals.css';

	import { auth } from '$lib/firebase/firebase';
	import { FirebaseApp } from 'sveltefire';
	import { onMount } from 'svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Shows Loading Spinner on page load
	let loading = true;

	onMount(() => {
		detectSWUpdate();

		window.addEventListener('offline', () => {
			window.location.reload();
		});

		// Checks if logged in when first loaded and whenever auth status changes after
		auth.onAuthStateChanged(async (user) => {
			// Shows Loading Spinner
			loading = true;
			let token;
			let location;
			// If logged in, send the jwt to server api endpoint and navigate from login page
			if (user) {
				token = await user.getIdToken();
				if ($page.url.pathname !== '/') {
					location = $page.url.pathname;
				} else {
					location = '/dashboard';
				}
			} else {
				// Else navigate to login page
				token = '';
				location = '/';
			}
			await fetch('/api/auth', {
				method: 'POST',
				body: JSON.stringify({ token: token })
			});

			await goto(location);
			// Hide Loading Spinner
			loading = false;
		});
	});

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('New Update Available! Reload to update?')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}
</script>

<FirebaseApp {auth}>
	{#if loading}
		<div class="spinner-parent">
			<LoadingSpinner />
		</div>
	{:else}
		<slot />
	{/if}
</FirebaseApp>
