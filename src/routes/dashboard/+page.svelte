<script>
	import { auth } from "$lib/firebase/firebase";
	import { signOut } from "firebase/auth";

	import { userStore } from "sveltefire";

	const user = userStore(auth);
</script>

<span>Hello {$user?.displayName}</span>

<button on:click={() => signOut(auth)}>Sign Out</button>