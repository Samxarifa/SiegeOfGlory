<script lang="ts">
	import DashboardWrapper from '$lib/components/DashboardWrapper.svelte';

	export let data;
</script>

<DashboardWrapper url={data.url}>
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
