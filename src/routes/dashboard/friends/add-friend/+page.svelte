<script lang="ts">
	import FriendCard from '$lib/components/FriendCard.svelte';
	import { fly } from 'svelte/transition';
</script>

<h1>Add Friend</h1>

<main in:fly={{ x: 100 }}>
	<div class="search">
		<form action="./" method="get">
			<input type="text" placeholder="Search" />
			<button type="submit"
				><img class="svg_icon" src="/icons/search.svg" alt="Search Icon" /></button
			>
		</form>
	</div>
	<FriendCard username="ScottTizzle" showAddButton />
</main>

<style>
	h1 {
		margin: 2rem 0;
		color: var(--text);
	}

	.search {
		width: 100%;
		background-color: var(--foreground);
		height: 5rem;
		border-radius: 1rem;
		margin-bottom: 2rem;
	}

	.search form {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.search input {
		background-color: var(--foreground);
		color: var(--text);
		font-size: 2rem;
		border: none;
		padding: 1rem;
		border-radius: 1rem;
		flex: 1;
		height: 100%;
	}

	.search input:focus {
		outline: none;
	}

	.search button {
		width: 5rem;
		background-color: var(--foreground);
		border: none;
		border-radius: 0 1rem 1rem 0;
	}

	.search button:hover {
		filter: invert(1);
	}

	.search:has(input:focus) {
		outline: solid 0.2rem var(--text);
	}
</style>
