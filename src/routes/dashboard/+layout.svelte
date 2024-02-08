<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
	import Nav from "$lib/components/Nav.svelte";
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
    <slot />
    <Nav />
</SignedIn>

<SignedOut>
    <div class="spinner-parent">
        <LoadingSpinner />
    </div>
</SignedOut>