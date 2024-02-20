<script lang="ts">
	import FriendCard from '$lib/components/FriendCard.svelte';
	import { fly } from 'svelte/transition';

	export let data;
</script>

<h1>Requests</h1>

<main in:fly={{ x: 100 }}>
	{#if data.users?.requests && data.users.requests.length > 0}
		<div class="cards">
			{#each data.users.requests as request}
				<FriendCard username={request.username} id={request.userId} showRequestButtons />
			{/each}
		</div>
	{:else}
		<span class="noRequests">You Have No Friend Requests</span>
	{/if}

	{#if data.users?.sent && data.users.sent.length > 0}
		<h2>Sent</h2>
		<div class="cards">
			{#each data.users.sent as sent}
				<FriendCard username={sent.username} id={sent.userId} />
			{/each}
		</div>
	{/if}
</main>

<style>
	h1,
	h2 {
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
