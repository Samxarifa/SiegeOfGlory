<script lang="ts">
	import '../globals.css';
    
    import { auth } from "$lib/firebase";
	import { FirebaseApp } from "sveltefire";
	import { onMount } from 'svelte';

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
        })
    })

</script>


<FirebaseApp {auth}>
    <slot />
</FirebaseApp>