<script lang="ts">
	import BattleCard from '$lib/components/BattleCard.svelte';

	export let data;

	let battleWidth: number;
</script>

<h1>History</h1>

{#if data.battles && data.battles?.length > 0}
	<div class="battles" bind:clientWidth={battleWidth} data-columns={battleWidth > 800 ? '2' : '1'}>
		{#each data.battles as battle}
			{#if battle.statType === 'd'}
				<BattleCard
					opponent={battle.opponentName}
					stat={battle.statType}
					time={battle.startDate}
					stat1={battle.stat1}
					stat2={battle.stat2}
					winner={battle.stat1 < battle.stat2}
					loser={battle.stat1 >= battle.stat2}
				/>
			{:else}
				<BattleCard
					opponent={battle.opponentName}
					stat={battle.statType}
					time={battle.startDate}
					stat1={battle.stat1}
					stat2={battle.stat2}
					winner={battle.stat1 > battle.stat2}
					loser={battle.stat1 <= battle.stat2}
				/>
			{/if}
		{/each}
	</div>
{:else}
	<span class="noBattles">No Completed Battles</span>
{/if}

<style>
	h1 {
		margin-block: 2rem;
		color: var(--text);
	}

	.battles {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.battles[data-columns='2'] {
		grid-template-columns: repeat(2, 1fr);
	}

	.noBattles {
		color: var(--text);
		text-align: center;
		display: block;
		width: 100%;
	}
</style>
