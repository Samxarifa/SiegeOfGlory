<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import type { ProfilePageReturn } from '$lib/statHandler.server.js';
	import { onMount } from 'svelte';

	export let data;
	let r6Data: ProfilePageReturn;
	let fetching = true;

	onMount(async () => {
		if (data.rainbowId) {
			r6Data = await fetch(
				'/api/getProfileStats?' +
					new URLSearchParams({
						r6Id: data.rainbowId
					})
			).then(async (val) => {
				return await val.json();
			});
			fetching = false;
		}
	});
</script>

<h1>Profile</h1>

<header>
	<span class="username">{data.username}</span>
	<table>
		<th><div><img class="svg_icon" src="/icons/trophy.svg" alt="Trophy Icon" />Wins</div></th>
		<th><div><img class="svg_icon" src="/icons/skull.svg" alt="Skull Icon" />Losses</div></th>
		<th><div><img class="svg_icon" src="/icons/friends.svg" alt="Friends Icon" />Friends</div></th>
		<tr>
			<td>{data.wins}</td>
			<td>{data.losses}</td>
			<td>{data.friendCount}</td>
		</tr>
	</table>
</header>

<h2>Rainbow Stats</h2>
{#if fetching}
	<div class="spinner">
		<LoadingSpinner />
	</div>
{:else}
	<main>
		<div class="stat">
			<span>K/D</span>
			<span class="value">{r6Data?.kd.toFixed(1)}</span>
		</div>
		<div class="stat">
			<span>Win%</span>
			<span class="value">{r6Data?.wl.toFixed(1)}</span>
		</div>
		<div class="stat">
			<span>Kills</span>
			<span class="value">{r6Data?.kills}</span>
		</div>
		<div class="stat">
			<span>Deaths</span>
			<span class="value">{r6Data?.deaths}</span>
		</div>
		<div class="stat">
			<span>Wins</span>
			<span class="value">{r6Data?.wins}</span>
		</div>
		<div class="stat">
			<span>Losses</span>
			<span class="value">{r6Data?.losses}</span>
		</div>
	</main>
{/if}

<style>
	h1 {
		margin: 2rem 0;
		color: var(--text);
	}

	header {
		background-color: var(--foreground);
		border-radius: 1rem;
		color: var(--text);
		display: flex;
		flex-direction: column;
		padding: 1rem;
		padding-bottom: 2rem;
		gap: 2rem;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.username {
		font-size: 2.4rem;
		width: fit-content;
		font-weight: bold;
		color: var(--blue);
		text-shadow:
			0 0 5rem var(--blue),
			0 0 1rem var(--background);
	}

	table,
	th,
	td {
		text-align: center;
	}

	table {
		width: 100%;
		table-layout: fixed;
	}

	th,
	td {
		height: 3rem;
	}

	th {
		font-size: 1.2rem;
	}

	td {
		font-size: 2rem;
	}

	th div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	th img {
		margin-top: 0.3rem;
	}

	h2 {
		margin: 2rem 0;
		font-size: 3.4rem;
		color: var(--text);
	}

	main {
		display: grid;
		gap: 1rem;
	}

	.stat {
		background-color: var(--foreground);
		padding: 1rem;
		border-radius: 1rem;
		color: var(--text);
		font-size: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.value {
		background-color: var(--text);
		color: var(--background);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 5rem;
		height: 5rem;
		overflow: hidden;
	}

	.spinner {
		display: flex;
		justify-content: center;
	}

	@media screen and (min-width: 375px) {
		main {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (min-width: 900px) {
		table {
			margin-bottom: 1rem;
		}

		th div {
			flex-direction: row;
			gap: 1rem;
		}

		main {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
