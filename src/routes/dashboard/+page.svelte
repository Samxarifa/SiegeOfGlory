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

	let battleWidth: number;

	// Greeting based on time of day
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
</div>

{#if data.battles && data.battles?.length > 0}
	<section
		class="battles"
		bind:clientWidth={battleWidth}
		data-columns={battleWidth > 800 ? '2' : battleWidth ? '1' : ''}
	>
		{#each data.battles as battle}
			<BattleCard
				opponent={battle.opponentName}
				stat={battle.statType}
				time={battle.startDate}
				id={battle.userId}
			/>
		{/each}
	</section>
{:else}
	<span class="noBattles">
		No Ongoing Battles <br />(To start a battle, go to the friends tab)
	</span>
{/if}

<style>
	header {
		background-color: var(--foreground);
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding-inline: 2rem;
		padding-block: 7rem;
		margin-top: -7rem;
		margin-inline: -1rem;
		color: var(--text);
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
		font-size: 30px; /* Pixels as Fitted by fitty */
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
	}

	.battle_header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: -5rem;
		border-radius: 5rem 5rem 0 0;
		margin-inline: -1rem;
		padding: 2rem;
		background-color: var(--background);
		box-shadow: 0 -20px 20px -20px black;
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
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-auto-rows: max-content;
		gap: 1rem;
	}

	.battles[data-columns='1'] {
		grid-template-columns: 1fr;
	}

	.battles[data-columns='2'] {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (min-width: 900px) {
		header {
			border-radius: 2rem;
			padding: 2rem;
			margin: 0;
		}

		.battle_header {
			margin: 0;
			margin-block: 2rem;
			padding: 0;
			box-shadow: none;
			justify-content: space-between;
			flex-direction: row;
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

	@media screen and (min-width: 1200px) {
		.battles {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
