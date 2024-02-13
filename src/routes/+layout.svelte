<script lang="ts">
	import '../globals.css';
    
    import { auth } from "$lib/firebase/firebase";
	import { FirebaseApp } from "sveltefire";
	import { onMount } from 'svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { goto } from '$app/navigation';

    let loading = true;

    onMount(() => {
        auth.onAuthStateChanged(async (user) => {
            let token;
            let location;
            if (user) {
                token = await user.getIdToken();
                location = "/dashboard";
            } else {
                token = '';
                location = "/";
            }
            await fetch("/api/auth", {
                method: "POST",
                body:JSON.stringify({"token":token})
            })

            goto(location);
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