<script>
	import { auth } from "$lib/firebase";
	import { signOut } from "firebase/auth";
	import { userStore } from "sveltefire";

    const user = userStore(auth);

</script>
<h1>Welcome to SvelteKit {$user?.displayName}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<button on:click={() => {
    signOut(auth);
}}>Sign Out</button>