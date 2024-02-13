<script lang="ts">
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
	import DashboardWrapper from "$lib/components/DashboardWrapper.svelte";
	import { SignedIn, SignedOut, userStore } from "sveltefire";

</script>

<SignedIn>
    <DashboardWrapper>
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