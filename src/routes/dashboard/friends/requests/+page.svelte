<script lang="ts">
	import FriendCard from '$lib/components/FriendCard.svelte';
	import { fly } from 'svelte/transition';
</script>

<h1>Requests</h1>

<main in:fly={{ x: 100 }}>
	<FriendCard username="ScottTizzle" showStartButton={false} showRequestButtons />
</main>

<style>
	h1 {
		color: white;
		margin: 2rem 0;
	}
</style>
