<script lang="ts">
	import { browser } from '$app/environment';
	import DashboardWrapper from '$lib/components/DashboardWrapper.svelte';
	import { env } from '$env/dynamic/public';

	export let data;

	const urlBase64ToUint8Array = (base64String: string) => {
		const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		// eslint-disable-next-line no-useless-escape
		const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

		const rawData = atob(base64);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	};

	async function getNotificationPermission() {
		if (!('Notification' in window)) {
			return;
		}
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			const sw = await navigator.serviceWorker.getRegistration();
			if (!sw) return;
			if (!(await sw.pushManager.getSubscription())) {
				const subscription = await sw.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(env.PUBLIC_NOTIF_KEY)
				});
				await fetch('/api/saveSubscription', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(subscription)
				});
			}
		}
	}

	browser && getNotificationPermission();
</script>

<DashboardWrapper url={data.url || ''} currentUser={data.currentUser || ''}>
	<slot />
</DashboardWrapper>

<style>
	@media screen and (min-width: 1000px) {
		:root {
			font-size: 70%;
		}
	}

	@media screen and (min-width: 2000px) {
		:root {
			font-size: 80%;
		}
	}
</style>
