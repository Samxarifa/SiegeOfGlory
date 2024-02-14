<script lang="ts">
	import FriendCard from '$lib/components/FriendCard.svelte';
	import type { AllUserReturn } from '$lib/dbHandler.server';
	import type { FuseResult } from 'fuse.js';
	import { fly } from 'svelte/transition';

	let results: FuseResult<AllUserReturn>[] = [];
	let input: string = '';
	let noFound = false;

	function debounce(func: Function, delay = 1000) {
		let timer: NodeJS.Timeout;

		return function (...args: any) {
			clearTimeout(timer);

			timer = setTimeout(() => {
				func(...args);
			}, delay);
		};
	}

	async function handleChange() {
		if (input) {
			let data = await fetch(
				'/api/searchUsers?' +
					new URLSearchParams({
						searchQ: input
					})
			);
			results = await data.json();
			results.length > 0 ? (noFound = false) : (noFound = true);
		} else {
			results = [];
			noFound = false;
		}
	}

	const debounceChange = debounce(handleChange);
</script>

<h1>Add Friend</h1>

<main in:fly={{ x: 100 }}>
	<div class="search">
		<form on:submit|preventDefault={debounceChange}>
			<input type="text" placeholder="Search" on:input={debounceChange} bind:value={input} />
			<button type="submit">
				<img class="svg_icon" src="/icons/search.svg" alt="Search Icon" />
			</button>
		</form>
	</div>
	<div class="cards">
		{#each results as user}
			<FriendCard username={user.item.username} id={user.item.userId} showAddButton />
		{/each}
	</div>
	{#if noFound}
		<span class="noFound">No Users Found</span>
	{/if}
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

	.cards {
		display: flex;
		flex-wrap: wrap;
	}

	.noFound {
		color: var(--text);
		display: block;
		text-align: center;
	}
</style>
