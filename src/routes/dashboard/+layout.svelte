<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import DashboardWrapper from '$lib/components/DashboardWrapper.svelte';
	import { SignedIn, SignedOut } from 'sveltefire';

	export let data;
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
