<script lang="ts">
	import '../globals.css';
    
    import { auth } from "$lib/firebase/firebase";
	import { FirebaseApp } from "sveltefire";
	import { onMount } from 'svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    // Shows Loading Spinner on page load
    let loading = true;

    onMount(() => {
        // Checks if logged in when first loaded and whenever auth status changes after
        auth.onAuthStateChanged(async (user) => {
            let token;
            let location;
            // If logged in, send the jwt to server api endpoint and navigate from login page
            if (user) {
                token = await user.getIdToken(true);
                if ($page.url.pathname !== "/") {
                    location = $page.url.pathname;
                } else {
                    location = "/dashboard";
                }
            } else {
                // Else navigate to login page
                token = '';
                location = "/";
            }
            await fetch("/api/auth", {
                method: "POST",
                body:JSON.stringify({"token":token})
            })

            goto(location);
            // Hide Loading Spinner
            loading = false;
        })
    })

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