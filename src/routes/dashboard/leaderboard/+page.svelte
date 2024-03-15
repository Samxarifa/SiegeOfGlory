<script lang="ts">
	import PodiumCard from '$lib/components/PodiumCard.svelte';
	import LI from '$lib/components/LeaderboardItem.svelte';
	import { fade } from 'svelte/transition';
</script>

<h1>Lineup</h1>

<section class="podium">
	<PodiumCard pos={2} username="SAMXARIFA#PSN" wins={1} losses={1} />
	<PodiumCard pos={1} username="SCOTTTIZZLE#PSN" wins={1} losses={1} />
	<PodiumCard pos={3} username="RYDEV04#PSN" wins={1} losses={1} />
</section>

<section class="list" in:fade={{ delay: 600 }}>
	<LI pos={4} username="SCOTBOTS#PSN" wins={1} losses={1} />
	<LI pos={5} username="TONRAY10#PSN" wins={1} losses={1} />
	<LI pos={6} username="NIGHTOWL9969#UBI" wins={1} losses={1} />
</section>

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
</style>
