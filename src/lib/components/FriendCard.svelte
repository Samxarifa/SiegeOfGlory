<script lang="ts">
	import { fly } from 'svelte/transition';

	// Get Props Passed in from component decleration
	export let username: string;
	export let id: string;
	export let showRequestButtons = false;
	export let showAddButton = false;
	export let showBattleButton = false;

	export let modalData:
		| {
				modal: HTMLDialogElement | undefined;
				id: string;
				name: string;
				statType: string;
				error: string;
		  }
		| undefined = undefined;

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

	async function startBattle() {
		if (modalData) {
			modalData.id = id;
			modalData.name = username;
			modalData.modal?.showModal();
		}
	}
</script>

{#if showCard}
	<div class="card" out:fly={{ x: 100 }}>
		<a href="/dashboard/profile/{id}">
			<img
				src={'https://api.dicebear.com/7.x/thumbs/svg?' +
					new URLSearchParams({
						seed: username
					})}
				alt="Profile Pic"
			/>
			<span>{username.slice(0, -4)}</span>
			<span class="platform">{username.slice(-3)}</span>
		</a>
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
			<button class="textButton" on:click={startBattle}>Start Battle</button>
		{/if}
	</div>
{/if}

<style>
	.card {
		background-color: var(--foreground);
		min-height: 7rem;
		border-radius: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--text);
		flex: 1;
		max-width: 100%;
	}

	a {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		color: var(--text);
		text-decoration: none;
		border-radius: 1rem;
		overflow: hidden;
	}

	a img {
		border-radius: 1rem;
		width: 5rem;
		position: absolute;
	}

	span {
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 2rem;
		margin-left: 6rem;
	}

	.platform {
		font-size: 1.2rem;
		color: gray;
		font-style: italic;
	}

	.textButton {
		background-color: transparent;
		border: solid 0.2rem var(--text);
		padding: 1rem;
		border-radius: 1rem;
		color: var(--text);
		cursor: pointer;
		margin: 1rem;
	}

	.requestButtons {
		display: flex;
		gap: 2rem;
		margin: 1rem;
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
