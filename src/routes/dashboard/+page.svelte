<script>
	import { browser } from "$app/environment";
	import { goto, invalidateAll } from "$app/navigation";
	import { auth } from "$lib/firebase/firebase";
	import { signOut } from "firebase/auth";

	import { userStore } from "sveltefire";

	const user = userStore(auth);
	async function handleSignOut() {
		signOut(auth);
		await invalidateAll();
		browser && await goto('/');
	}
</script>

<span>Hello {$user?.displayName}</span>

<button on:click={handleSignOut}>Sign Out</button>