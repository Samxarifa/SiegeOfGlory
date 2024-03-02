<script lang="ts">
	import BattleCard from '$lib/components/BattleCard.svelte';
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
	import fitty from 'fitty';
	import { onMount } from 'svelte';

	// Gets Data from server function (+page.server.ts)
	export let data;

	let usernameSpan: HTMLSpanElement;

	onMount(() => {
		fitty(usernameSpan, { maxSize: 24 });
	});
</script>

<header>
	<div class="div_hello">
		<span class="hello">Hello,</span>
		<br />
		<span class="username" bind:this={usernameSpan}>{data.stats?.username}</span>
	</div>
	<table>
		<th><div><img class="svg_icon" src="/icons/trophy.svg" alt="Trophy Icon" />Wins</div></th>
		<th><div><img class="svg_icon" src="/icons/battle.svg" alt="Trophy Icon" />Ongoing</div></th>
		<th><div><img class="svg_icon" src="/icons/skull.svg" alt="List Icon" />Losses</div></th>
		<tr>
			<td>{data.stats?.wins}</td>
			<td>{data.stats?.ongoing}</td>
			<td>{data.stats?.losses}</td>
		</tr>
	</table>
	<button class="btn_signout" on:click={() => signOut(auth)}
		>Sign Out <img class="svg_icon" src="/icons/logout.svg" alt="Logout Icon" /></button
	>
</header>

<h1>Ongoing Battles</h1>

<section class="battles">
	{#if data.battles && data.battles?.length > 0}
		{#each data.battles as battle}
			<BattleCard opponent={battle.opponentName} stat={battle.statType} time={battle.startDate} />
		{/each}
	{:else}
		<span class="noBattles">
			No Ongoing Battles <br />(To start a battle, go to the friends tab)
		</span>
	{/if}
</section>

<style>
	header {
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

	.div_hello {
		width: 100%;
	}

	.hello {
		font-size: 1.6rem;
	}

	.username {
		font-size: 2.4rem;
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

	.btn_signout {
		width: fit-content;
		padding: 1rem;
		background-color: var(--foreground);
		border: solid 0.2rem var(--text);
		border-radius: 1rem;
		color: var(--text);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-left: auto;
	}

	.noBattles {
		color: var(--text);
		text-align: center;
		display: block;
		width: 100%;
	}

	h1 {
		color: white;
		margin: 2rem 0;
	}

	.battles {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	@media screen and (min-width: 900px) {
		.btn_signout {
			display: none;
		}

		table {
			margin-bottom: 1rem;
		}

		th div {
			flex-direction: row;
			gap: 1rem;
		}
	}
</style>
