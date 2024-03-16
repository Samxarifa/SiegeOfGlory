<script lang="ts">
	import PodiumCard from '$lib/components/PodiumCard.svelte';
	import LI from '$lib/components/LeaderboardItem.svelte';
	import { fade } from 'svelte/transition';

	export let data;
</script>

<h1>Lineup</h1>
{#if data.lb && data.lb.length > 2}
	<section class="podium">
		<PodiumCard
			pos={2}
			username={data.lb[1].username}
			wins={data.lb[1].wins}
			losses={data.lb[1].losses}
		/>
		<PodiumCard
			pos={1}
			username={data.lb[0].username}
			wins={data.lb[0].wins}
			losses={data.lb[0].losses}
		/>
		<PodiumCard
			pos={3}
			username={data.lb[2].username}
			wins={data.lb[2].wins}
			losses={data.lb[2].losses}
		/>
	</section>
{/if}
{#if data.lb && data.lb.length > 1}
	<section class="list" in:fade={{ delay: 600 }}>
		{#each data.lb as row}
			{#if row.row > 3 || data.lb.length < 3}
				<LI pos={row.row} username={row.username} wins={row.wins} losses={row.losses} />
			{/if}
		{/each}
	</section>
{:else}
	<span class="noFriends">Navigate to the friends tab to make new friends</span>
{/if}

<style>
	h1 {
		color: var(--text);
		margin-block: 2rem;
	}

	.podium {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1rem;
		align-items: center;
		margin-bottom: 3rem;
		max-width: 50rem;
		margin-inline: auto;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 1000px;
		margin-inline: auto;
	}

	.noFriends {
		color: var(--text);
		display: block;
		text-align: center;
	}
</style>
