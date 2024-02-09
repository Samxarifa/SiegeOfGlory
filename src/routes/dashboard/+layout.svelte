<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
	import NavWrapper from "$lib/components/NavWrapper.svelte";
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
    <NavWrapper>
		<slot />
	</NavWrapper>
</SignedIn>

<SignedOut>
    <div class="spinner-parent">
        <LoadingSpinner />
    </div>
</SignedOut>