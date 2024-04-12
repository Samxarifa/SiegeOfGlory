<script lang="ts">
	import FriendCard from '$lib/components/FriendCard.svelte';
	import type { FuseResult } from 'fuse.js';
	import { fly } from 'svelte/transition';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let results: FuseResult<{ userId: string; username: string }>[] = [];
	let input: string = '';
	let noFound = false;
	let loading = false;
	let timer: NodeJS.Timeout;
	let friendWidth: number;

	async function handleChange() {
		clearTimeout(timer);

		timer = setTimeout(async () => {
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
			loading = false;
		}, 1000);
		loading = true;
	}
</script>

<h1>Add Friend</h1>

<main in:fly={{ x: 100 }}>
	<div class="search">
		<form on:submit|preventDefault={handleChange}>
			<input type="text" placeholder="Search" on:input={handleChange} bind:value={input} />
			<button type="submit">
				<img class="svg_icon" src="/icons/search.svg" alt="Search Icon" />
			</button>
		</form>
	</div>
	{#if !loading}
		<div
			class="cards"
			bind:clientWidth={friendWidth}
			data-columns={friendWidth > 800 ? '2' : friendWidth ? '1' : ''}
		>
			{#each results as user}
				<FriendCard username={user.item.username} id={user.item.userId} showAddButton />
			{/each}
		</div>
		{#if noFound}
			<span class="noFound">No Users Found</span>
		{/if}
	{:else}
		<div class="loadingSpinner">
			<LoadingSpinner />
		</div>
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
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: max-content;
		gap: 1rem;
	}

	.cards[data-columns='1'] {
		grid-template-columns: 1fr;
	}

	.cards[data-columns='2'] {
		grid-template-columns: repeat(2, 1fr);
	}

	.noFound {
		color: var(--text);
		display: block;
		text-align: center;
	}

	.loadingSpinner {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		margin-top: 5rem;
	}

	@media screen and (min-width: 1200px) {
		.cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
