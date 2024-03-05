<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import DashboardWrapper from '$lib/components/DashboardWrapper.svelte';
	import { SignedIn, SignedOut } from 'sveltefire';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';

	export let data;

	// Sets config for NProgress (Navigation Progress Bar at Top of Page)
	NProgress.configure({
		// https://github.com/rstacruz/nprogress#configuration
		minimum: 0.2,
		showSpinner: false
	});

	// Watches for navigating changes and starts/stops NProgress
	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<SignedIn>
	<DashboardWrapper url={data.url}>
		<slot />
	</DashboardWrapper>
</SignedIn>

<SignedOut>
	<div class="spinner-parent">
		<LoadingSpinner />
	</div>
</SignedOut>

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
