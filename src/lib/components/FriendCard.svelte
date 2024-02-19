<script lang="ts">
	// Get Props Passed in from component decleration
	export let username: string;
	export let id: string;
	export let showRequestButtons = false;
	export let showAddButton = false;
	export let showBattleButton = false;

	let showCard = true;

	async function sendFriendRequest() {
		showCard = false;
		await fetch('/api/friends/add', {
			method: 'POST',
			body: JSON.stringify({
				friendId: id
			})
		});
	}

	async function denyFriendRequest() {
		showCard = false;
		await fetch('/api/friends/deny', {
			method: 'POST',
			body: JSON.stringify({
				friendId: id
			})
		});
	}
</script>

{#if showCard}
	<div class="card">
		<span>{username}</span>
		{#if showAddButton}
			<button class="textButton" on:click={sendFriendRequest}>Add Friend</button>
		{:else if showRequestButtons}
			<div class="requestButtons">
				<button class="request" on:click={sendFriendRequest}
					><img class="svg_icon" src="/icons/tick.svg" alt="Tick Icon" /></button
				>
				<button class="request" on:click={denyFriendRequest}
					><img class="svg_icon" src="/icons/cross.svg" alt="Cross Icon" /></button
				>
			</div>
		{:else if showBattleButton}
			<button class="textButton">Start Battle</button>
		{/if}
	</div>
{/if}

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
		flex: 1;
	}

	.textButton {
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
