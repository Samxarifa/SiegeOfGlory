<script lang="ts">
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import { SignedIn, SignedOut } from "sveltefire";
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

<style>
    .spinner-parent {
        width: 100%;
        height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>