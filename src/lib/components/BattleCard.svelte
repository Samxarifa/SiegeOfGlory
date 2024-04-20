<script lang="ts">
	import { onMount } from 'svelte';

	// Get Props Passed in from component decleration
	export let id: string;
	export let opponent: string;
	export let stat: string;
	export let time: string;
	export let stat1: number | undefined = undefined;
	export let stat2: number | undefined = undefined;
	export let winner: number | undefined = undefined;

	const nullSymbol = 'Ø';

	// Vars for time calculations
	let timeLeft: number;
	let timeMetric: string;
	let now = Date.now();

	// Update current time every minute
	onMount(() => {
		const interval = setInterval(() => {
			now = Date.now();
		}, 1000 * 60);

		// Stop updating time when component is destroyed
		return () => clearInterval(interval);
	});

	// Calculate time left and time metric from new current time
	$: {
		if (time) {
			// timeLeft = ((time + 1 day) - now) in Hours
			timeLeft = (new Date(time).getTime() + 1000 * 60 * 60 * 24 - now) / 1000 / 60 / 60;
			// If less than 1 hour left
			if (Math.floor(timeLeft) < 1) {
				// Change time to minutes
				timeLeft = Math.floor(timeLeft * 60);
				timeMetric = 'Minutes';
			} else {
				// Else, Keep time in hours
				timeLeft = Math.floor(timeLeft);
				timeMetric = 'Hours';
			}
		}
	}
</script>

<div class="card {winner == 1 && 'winner'} {winner == 2 && 'loser'}">
	{#if winner == 1}
		<img class="svg_icon" src="/icons/trophy.svg" alt="Trophy Icon" />
	{:else if winner == 2}
		<img class="svg_icon" src="/icons/skull.svg" alt="Skull Icon" />
	{:else}
		<img class="svg_icon" src="/icons/battle.svg" alt="Battle Icon" />
	{/if}
	<img
		src={'https://api.dicebear.com/7.x/thumbs/svg?' +
			new URLSearchParams({
				seed: id
			})}
		alt="Profile Pic"
		class="profile_pic"
	/>
	<div class="details">
		<div class="username">
			<span class="opponent">{opponent.slice(0, -4)}</span>
			<span class="platform">{opponent.slice(-3)}</span>
		</div>
		<span>
			{#if stat == 'k'}
				Most Kills
			{:else if stat == 'd'}
				Least Deaths
			{:else if stat == 'w'}
				Win %
			{/if}
		</span>
		<span>
			{#if winner === undefined}
				{#if new Date(time).getTime() > now}
					Starts <b>Tommorow...</b>
				{:else if new Date(time).getTime() + 1000 * 60 * 60 * 24 - now < 1}
					Completed: Waiting to be Counted
				{:else}
					Ends In: <b>{timeLeft} {timeMetric}</b>
				{/if}
			{:else}
				{new Date(time).toDateString()}
			{/if}
		</span>
	</div>
	{#if winner !== undefined}
		<div class="final_stats">
			{#if winner == 1}
				<span><b>{stat1 || nullSymbol}</b> - {stat2 || nullSymbol}</span>
			{:else if winner == 2}
				<span>{stat1 || nullSymbol} - <b>{stat2 || nullSymbol}</b></span>
			{:else}
				<span>{stat1 || nullSymbol} - {stat2 || nullSymbol}</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.card {
		background-color: var(--foreground);
		width: 100%;
		height: 10rem;
		border-radius: 1rem;
		display: flex;
		padding: 1rem;
		color: white;
		font-size: 2rem;
		gap: 1rem;
		align-items: center;
		position: relative;
	}

	.winner {
		background: linear-gradient(to right, var(--foreground) 50%, var(--blue) 150%);
	}

	.loser {
		background: linear-gradient(to right, var(--foreground) 50%, var(--orange) 150%);
	}

	.svg_icon {
		height: 2rem;
		width: 2rem;
		/* margin-left: 1rem; */
	}

	.profile_pic {
		height: 6rem;
		width: 6rem;
		border-radius: 1rem;
	}

	.details {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		font-size: 1.2rem;
		padding: 1rem 0;
	}

	.opponent {
		text-shadow:
			0 0 3rem var(--orange),
			0 0 1rem var(--background);
		flex: 1;
		text-align: left;
		color: var(--orange);
		font-size: 1.6rem;
	}

	.platform {
		font-size: 1.2rem;
		color: gray;
		font-style: italic;
	}

	.final_stats {
		margin-left: auto;
	}

	.final_stats span {
		font-size: 2.4rem;
	}
</style>
