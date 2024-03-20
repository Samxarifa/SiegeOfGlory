<script lang="ts">
	import BattleCard from '$lib/components/BattleCard.svelte';

	export let data;
</script>

<h1>History</h1>

<div class="battles">
	{#if data.battles && data.battles?.length > 0}
		{#each data.battles as battle}
			<BattleCard
				opponent={battle.opponentName}
				stat={battle.statType}
				time={battle.startDate}
				stat1={battle.stat1}
				stat2={battle.stat2}
				winner={battle.stat1 > battle.stat2}
				loser={battle.stat1 <= battle.stat2}
			/>
		{/each}
	{:else}
		<span class="noBattles">No Completed Battles</span>
	{/if}
</div>

<style>
	h1 {
		margin-block: 2rem;
		color: var(--text);
	}

	.battles {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.noBattles {
		color: var(--text);
		text-align: center;
		display: block;
		width: 100%;
	}
</style>
