<script lang="ts">
	import BattleCard from '$lib/components/BattleCard.svelte';
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
	import fitty from 'fitty';
	import { onMount } from 'svelte';

	// Gets Data from server function (+page.server.ts)
	export let data;

	// Gets binded to HTML username span (used to fit text with fitty)
	let usernameSpan: HTMLSpanElement;
	let hello: string;

	if (new Date().getHours() < 12) {
		hello = 'Good Morning,';
	} else if (new Date().getHours() < 18) {
		hello = 'Good Afternoon,';
	} else {
		hello = 'Good Evening,';
	}

	onMount(() => {
		fitty(usernameSpan, { maxSize: 30 });
	});
</script>

<svelte:head>
	<meta name="theme-color" content="#2A2A2A" />
</svelte:head>

<header>
	<div class="top">
		<span class="hello">{hello}</span>
		<button class="btn_signout" on:click={() => signOut(auth)}
			><div class="logoutIcon"></div></button
		>
	</div>
	<div class="div_username">
		<span class="username" bind:this={usernameSpan}>{data.stats?.username.slice(0, -4)}</span>
		<span class="platform">{data.stats?.username.slice(-3)}</span>
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
</header>

<div class="battle_header">
	<h1>Ongoing Battles</h1>
	<a class="history" href="/dashboard/history">
		History
		<img src="/icons/history.svg" alt="History Icon" class="svg_icon" />
	</a>
</div>

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
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		gap: 5rem;
		padding: 2rem;
		padding-top: 7rem;
		color: var(--text);
		border-radius: 0 0 4rem 4rem;
		box-shadow: inset 0 -10px 10px -10px black;
		width: 100%;
	}

	.top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.hello {
		font-size: 2rem;
	}

	.div_username {
		text-align: center;
		height: 5rem;
	}

	.username {
		align-self: center;
		font-size: 3rem;
		margin-top: auto;
		font-weight: bold;
		color: var(--blue);
		text-shadow:
			0 0 5rem var(--blue),
			0 0 1rem var(--background);
	}

	.platform {
		font-size: 1.2rem;
		color: gray;
		font-style: italic;
		display: block;
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
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--foreground);
		color: var(--orange);
		border: none;
		border-radius: 50%;
		padding: 1rem;
		right: 2rem;
		top: 6rem;
		box-shadow: 0 1px 10px -1px var(--background);
		color: var(--orange);
		cursor: pointer;
	}

	.logoutIcon {
		background-color: var(--orange);
		width: 2.4rem;
		height: 2.4rem;
		mask: url('/icons/logout.svg') no-repeat center / contain;
		-webkit-mask: url('/icons/logout.svg') no-repeat center / contain;
	}

	.battle_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 31rem;
		margin-bottom: 2rem;
	}

	.history {
		background-color: var(--foreground);
		border: solid 0.2rem var(--text);
		cursor: pointer;
		border-radius: 1rem;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		text-decoration: none;
		position: relative;
		color: var(--text);
	}

	.history img {
		width: 3rem;
		height: 3rem;
	}

	.noBattles {
		color: var(--text);
		text-align: center;
		display: block;
		width: 100%;
	}

	h1 {
		color: var(--text);
	}

	.battles {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	@media screen and (min-width: 900px) {
		header {
			position: relative;
			border-radius: 2rem;
			padding-top: 2rem;
			box-shadow: none;
		}

		.battle_header {
			margin-top: 2rem;
		}

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
