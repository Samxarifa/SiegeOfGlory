<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
	import DashboardWrapper from "$lib/components/DashboardWrapper.svelte";
	import { auth } from "$lib/firebase/firebase";
	import { SignedIn, SignedOut, userStore } from "sveltefire";

    const user = userStore(auth);

    $: {
		if (!$user) {
			invalidateAll().then(() => {
				goto("/");
			})
		}
	}

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