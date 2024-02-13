<script lang="ts">
	import { goto } from '$app/navigation';
	import FriendCard from '$lib/components/FriendCard.svelte';
</script>

<div class="top">
	<h1>Friends</h1>
	<a href="./friends/add-friend">Add<img class="svg_icon" src="/icons/personAdd.svg" alt="" /></a>
</div>

<main>
	<button class="requests" on:click={() => goto('./friends/requests')}>
		<span>Friend Requests (1)</span>
		<img src="/icons/arrowRight.svg" alt="Arrow Right" />
	</button>
	<FriendCard username="ScottTizzle" showBattleButton/>
</main>

<style>
	.top {
		display: flex;
		gap: 1rem;
		margin: 2rem 0;
	}

	.top a {
		border: solid 0.2rem var(--text);
		border-radius: 1rem;
		color: white;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 0 1rem;
		height: 4rem;
		background-color: var(--foreground);
	}

	h1 {
		color: var(--text);
		margin-right: auto;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.requests {
		width: 100%;
		height: 7rem;
		background-color: var(--foreground);
		border-radius: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
		padding: 1rem;
		font-size: 2rem;
		margin-bottom: 1rem;
		cursor: pointer;
		border: none;
	}

	.requests img {
		filter: invert(1);
	}
</style>
