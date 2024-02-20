<script lang="ts">
	// Get Props Passed in from component decleration
	export let opponent: string;
	export let stat: string;
	export let time: string;
</script>

<div class="card">
	<img class="svg_icon" src="icons/battle.svg" alt="Battle Icon" />
	<div class="details">
		<span class="opponent">{opponent}</span>
		<span>{stat}</span>
		<span>{time} Left</span>
	</div>
</div>

<style>
	.card {
		background-color: var(--foreground);
		flex: 1;
		height: 10rem;
		border-radius: 1rem;
		display: flex;
		padding: 1rem;
		color: white;
		font-size: 2rem;
		gap: 1rem;
		align-items: center;
	}

	.svg_icon {
		height: 5rem;
		width: 5rem;
		/* margin-left: 1rem; */
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

	@media screen and (min-width: 450px) {
		.card {
			min-width: 40rem;
		}
	}

	@media screen and (min-width: 1400px) {
		.card {
			max-width: 50%;
		}
	}
</style>
