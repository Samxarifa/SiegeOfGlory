<script lang="ts">
	import FriendCard from '$lib/components/FriendCard.svelte';
	import { fly } from 'svelte/transition';

	export let data;
</script>

<h1>Requests</h1>

<main in:fly={{ x: 100 }}>
	{#if data.requests && data.requests.length > 0}
		<div class="cards">
			{#each data.requests as request}
				<FriendCard username={request.username} id={request.userId} showRequestButtons />
			{/each}
		</div>
	{:else}
		<span class="noRequests">You Have No Friend Requests</span>
	{/if}
</main>

<style>
	h1 {
		color: white;
		margin: 2rem 0;
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
	}

	.noRequests {
		color: white;
		display: block;
		text-align: center;
	}
</style>
