<script lang="ts">
	import '../globals.css';
    
    import { auth } from "$lib/firebase";
	import { FirebaseApp } from "sveltefire";

</script>


<FirebaseApp {auth}>
    <slot />
</FirebaseApp>