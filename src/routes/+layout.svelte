<script lang="ts">
	import '../globals.css';
    
    import { auth } from "$lib/firebase/firebase";
	import { FirebaseApp } from "sveltefire";
	import { onMount } from 'svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { goto, invalidateAll } from '$app/navigation';

    let loading = true;

    onMount(() => {
        auth.onIdTokenChanged(async (user) => {
            let token;
            if (user) {
                token = await user.getIdToken();
                
            } else {
                token = '';
            }
            await fetch("api/auth", {
                method: "POST",
                body:JSON.stringify({"token":token})
            })
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