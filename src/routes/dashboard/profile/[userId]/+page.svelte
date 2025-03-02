<script lang="ts">
	import { browser } from '$app/environment';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import type { ProfilePageReturn } from '$lib/statHandler.server.js';
	import fitty from 'fitty';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let data;
	let r6Data: ProfilePageReturn;
	let fetching = true;

	// Get Username Span for auto text resize
	let usernameSpan: HTMLSpanElement;

	// Auto resize the username
	onMount(() => {
		fitty(usernameSpan, { maxSize: 24 });
	});

	// Get the rainbow six data
	async function getR6Data() {
		fetching = true;
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

	// Get the rainbow six r6Id change
	$: {
		if (browser && data.rainbowId) {
			getR6Data();
		}
	}
</script>

<header>
	<img
		src={'https://api.dicebear.com/7.x/thumbs/svg?' +
			new URLSearchParams({
				seed: data.userId
			})}
		alt="Profile Pic"
		class="profile_pic"
	/>
	<div class="username_parent">
		<div class="username_div">
			<div>
				<h1
					class="username {data.currentUser === data.userId ? 'you' : 'opponent'}"
					bind:this={usernameSpan}
				>
					{data.username.slice(0, -4)}
				</h1>
				<span class="platform">{data.username.slice(-3)}</span>
			</div>
		</div>
	</div>
	<div class="sog_stats">
		<table>
			<th><div><img class="svg_icon" src="/icons/trophy.svg" alt="Trophy Icon" />Wins</div></th>
			<th><div><img class="svg_icon" src="/icons/skull.svg" alt="Skull Icon" />Losses</div></th>
			<th><div><img class="svg_icon" src="/icons/friends.svg" alt="Friends Icon" />Friends</div></th
			>
			<tr>
				<td>{data.wins}</td>
				<td>{data.losses}</td>
				<td>{data.friendCount}</td>
			</tr>
		</table>
	</div>
</header>

<h2>Rainbow Stats</h2>
<span class="days7">(Last 7 Days)</span>
{#if fetching}
	<div class="spinner">
		<LoadingSpinner />
	</div>
{:else}
	<main in:fly={{ x: 100 }}>
		<div class="stat">
			<span>K/D</span>
			<span class="value">{r6Data?.kd.toFixed(1)}</span>
		</div>
		<div class="stat">
			<span>Win/Loss</span>
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
	header {
		display: grid;
		grid-template-columns: 5rem calc(100% - 6rem);
		grid-template-rows: 5rem 10rem;
		gap: 1rem;
	}

	.profile_pic {
		border-radius: 1rem;
		width: 100%;
	}

	.username_parent {
		background-color: var(--foreground);
		border-radius: 1rem;
		padding: 1rem;
		text-align: center;
	}

	.username_div {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.username_div div {
		width: 100%;
	}

	.username {
		font-size: 24px; /* Pixels as Fitted by fitty */
		display: inline;
		font-weight: bold;
		color: var(--text);
	}

	.you {
		color: var(--blue);
		text-shadow:
			0 0 5rem var(--blue),
			0 0 1rem var(--background);
	}

	.opponent {
		color: var(--orange);
		text-shadow:
			0 0 5rem var(--orange),
			0 0 1rem var(--background);
	}

	.platform {
		font-size: 1.2rem;
		color: gray;
		font-style: italic;
	}

	.sog_stats {
		grid-column: 1/-1;
		grid-row: 2;
		background-color: var(--foreground);
		border-radius: 1rem;
		color: var(--text);
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 2rem;
		justify-content: center;
		margin-bottom: 1rem;
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
		margin-top: 2rem;
		font-size: 3.4rem;
		color: var(--text);
	}

	.days7 {
		color: var(--text);
		margin-bottom: 2rem;
		display: block;
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
		overflow: hidden;
	}

	@media screen and (min-width: 375px) {
		main {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (min-width: 700px) {
		header {
			grid-template-columns: 15rem calc(100% - 16rem);
		}

		header img {
			grid-row: 1/-1;
		}

		.sog_stats {
			grid-column: 2;
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
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
