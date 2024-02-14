<script lang="ts">
	import BattleCard from '$lib/components/BattleCard.svelte';
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
	import { userStore } from 'sveltefire';

	// Gets Data from server function (+page.server.ts)
	export let data;

	// Gets Firebase User in form of SvelteKit Store
	const user = userStore(auth);
</script>

<header>
	<div class="div_hello">
		<span class="hello">Hello,</span>
		<span class="username">{$user?.displayName}</span>
	</div>
	<table>
		<th><div><img class="svg_icon" src="icons/trophy.svg" alt="Trophy Icon" />Wins</div></th>
		<th><div><img class="svg_icon" src="icons/battle.svg" alt="Trophy Icon" />Ongoing</div></th>
		<th><div><img class="svg_icon" src="icons/skull.svg" alt="List Icon" />Losses</div></th>
		<tr>
			<td>{data.stats?.wins}</td>
			<td>{data.stats?.ongoing}</td>
			<td>{data.stats?.losses}</td>
		</tr>
	</table>
	<button class="btn_signout" on:click={() => signOut(auth)}
		>Sign Out <img class="svg_icon" src="icons/logout.svg" alt="Logout Icon" /></button
	>
</header>

<h1>Ongoing Battles</h1>

<section class="battles">
	<BattleCard opponent="Test" stat="Most Kills" time="5 Hours Left" />
	<button class="btn_more">Show More</button>
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
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.hello {
		font-size: 1.6rem;
	}

	.username {
		font-size: 2.4rem;
		width: fit-content;
		background: linear-gradient(to right, var(--blue), var(--text), var(--orange));
		background-clip: text;
		color: transparent;
		font-weight: bold;
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

	.btn_more,
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
	}

	.btn_signout {
		margin-left: auto;
	}

	.btn_more {
		margin: 1rem auto;
		margin-top: 2rem;
	}

	h1 {
		color: white;
		margin: 2rem 0;
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
