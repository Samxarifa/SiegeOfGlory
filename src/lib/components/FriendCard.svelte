<script lang="ts">
	// Get Props Passed in from component decleration
	export let username: string;
	export let showStartButton = true;
	export let showRequestButtons = false;
</script>

<div class="card">
	<span>{username}</span>
	{#if showStartButton}
		<button class="start">Start Battle</button>
	{:else if showRequestButtons}
		<div class="requestButtons">
			<button class="request"><img class="svg_icon" src="/icons/tick.svg" alt="Tick Icon" /></button
			>
			<button class="request"
				><img class="svg_icon" src="/icons/cross.svg" alt="Tick Icon" /></button
			>
		</div>
	{/if}
</div>

<style>
	.card {
		background-color: var(--foreground);
		height: 7rem;
		border-radius: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		color: var(--text);
	}

	.start {
		background-color: transparent;
		border: solid 0.2rem var(--text);
		padding: 1rem;
		border-radius: 1rem;
		color: var(--text);
		cursor: pointer;
	}

	.requestButtons {
		display: flex;
		gap: 2rem;
	}

	.request {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	.request img {
		width: 4rem;
		height: 4rem;
	}
</style>
