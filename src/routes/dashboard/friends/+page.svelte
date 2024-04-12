<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import FriendCard from '$lib/components/FriendCard.svelte';

	export let data;

	let friendWidth: number;

	// Used for data passing between modal and Friend Cards
	let modalData: {
		modal: HTMLDialogElement | undefined;
		id: string;
		name: string;
		statType: string;
		error: string;
	} = {
		modal: undefined,
		id: '',
		name: '',
		statType: '',
		error: ''
	};

	// Closes the modal and resets the modalData
	function closeModal() {
		modalData.modal?.close();
		modalData = {
			...modalData,
			id: '',
			name: '',
			statType: '',
			error: ''
		};
	}

	// Runs when modal form is submitted
	async function handleSubmit() {
		// Removes Any Previous Errors
		modalData.error = '';
		// Fetches Start Battle and returns the result in json
		const res = await fetch('/api/startBattle', {
			method: 'POST',
			body: JSON.stringify({
				friendId: modalData.id,
				statType: modalData.statType
			})
		}).then(async (res) => await res.json());
		// If successful, rerun the get friends load function and close the modal
		if (res.success) {
			await invalidate('get:friends');
			closeModal();
		} else {
			// If not successful, set the error message to the response message
			modalData.error = res.message;
		}
	}

	$: {
		// If there is an error message, remove it after 1 second
		if (modalData.error === 'ST') {
			setTimeout(() => {
				modalData.error = '';
			}, 1000);
		}
	}
</script>

<div class="top">
	<h1>Friends</h1>
	<a href="./friends/add-friend"
		>Add<img class="svg_icon" src="/icons/personAdd.svg" alt="Add Friend Icon" /></a
	>
</div>

<main>
	<button class="requests" on:click={() => goto('./friends/requests')}>
		<span>Friend Requests</span>
		<img src="/icons/arrowRight.svg" alt="Arrow Right" />
	</button>
	{#if data.friends && data.friends.length > 0}
		<div
			class="cards"
			bind:clientWidth={friendWidth}
			data-columns={friendWidth > 800 ? '2' : friendWidth ? '1' : ''}
		>
			{#each data.friends as friend}
				<FriendCard
					username={friend.username}
					id={friend.userId}
					bind:modalData
					showBattleButton={Boolean(!friend.battle)}
				/>
			{/each}
		</div>
	{:else}
		<span class="noFriend">Click add to find a new Friend</span>
	{/if}
	<dialog bind:this={modalData.modal}>
		<div class="dialog_inner">
			<div class="dialog_header">
				<h2>Start Battle</h2>
				<button on:click={closeModal}>
					<img src="/icons/close.svg" alt="Close Icon" class="svg_icon" />
				</button>
			</div>
			<span class="dialog_username">{modalData.name.slice(0, -4)}</span>
			<span class="dialog_platform">{modalData.name.slice(-3)}</span>
			<div class="dates">
				<span>
					<b>{new Date(Date.now() + 1000 * 60 * 60 * 24).toLocaleDateString('en-GB')}</b>
				</span>
				<span>-</span>
				<span>
					<b>{new Date(Date.now() + 1000 * 60 * 60 * 48).toLocaleDateString('en-GB')}</b>
				</span>
			</div>
			<form method="POST" on:submit|preventDefault={handleSubmit}>
				<div class="select">
					<label for="statType">Stat Type: </label>
					<select
						name="statType"
						id="statType"
						bind:value={modalData.statType}
						class={modalData.error === 'ST' ? 'error' : ''}
					>
						<option value="" disabled selected>Select Stat</option>
						<option value="k">Most Kills</option>
						<option value="d">Least Deaths</option>
						<option value="w">Win%</option>
					</select>
				</div>
				<button type="submit">Start</button>
			</form>
		</div>
	</dialog>
</main>

<style>
	.top {
		display: flex;
		gap: 1rem;
		margin: 2rem 0;
	}

	.top a {
		border: solid 0.2rem var(--text);
		border-radius: 1rem;
		color: white;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 0 1rem;
		height: 4rem;
		background-color: var(--foreground);
	}

	h1 {
		color: var(--text);
		margin-right: auto;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.requests {
		width: 100%;
		height: 7rem;
		background-color: var(--foreground);
		border-radius: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
		padding: 1rem;
		font-size: 2rem;
		margin-bottom: 1rem;
		cursor: pointer;
		border: none;
	}

	.requests img {
		filter: invert(1);
	}

	.cards {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: max-content;
		gap: 1rem;
	}

	.cards[data-columns='1'] {
		grid-template-columns: 1fr;
	}

	.cards[data-columns='2'] {
		grid-template-columns: repeat(2, 1fr);
	}

	.noFriend {
		color: var(--text);
		display: block;
		text-align: center;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.25);
	}

	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--background);
		color: var(--text);
		width: calc(100vw - 6rem);
		max-width: 40rem;
		height: 30rem;
		border: solid 0.2rem var(--foreground);
		border-radius: 1rem;
		padding: 2rem;
		overflow: visible;
	}

	.dialog_inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		height: 100%;
		overflow: hidden;
	}

	.dialog_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.dialog_header button {
		background-color: transparent;
		border: none;
		color: inherit;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.dialog_header button img {
		width: 3rem;
		height: 3rem;
	}

	dialog button:hover,
	dialog button:focus-visible {
		outline: none;
		filter: brightness(0.75);
	}

	.dialog_username {
		color: var(--orange);
		font-size: 3rem;
		margin-top: 1rem;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
	}

	.dialog_platform {
		color: gray;
		font-size: 1.2rem;
		font-style: italic;
		margin-top: -1rem;
	}

	dialog form {
		display: flex;
		align-items: center;
		flex-direction: column;
		flex: 1;
		width: 100%;
	}

	dialog form .select {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 1.6rem;
		margin-top: 2rem;
	}

	dialog form .select label {
		display: none;
	}

	dialog form select {
		background-color: var(--background);
		border: solid 0.2rem var(--foreground);
		border-radius: 1rem;
		padding: 1rem;
		color: inherit;
		font-size: 1.6rem;
		font-weight: bold;
		cursor: pointer;
		height: 4.5rem;
	}

	dialog form button {
		margin-top: auto;
		margin-left: auto;
		padding: 1rem 2rem;
		background-color: var(--text);
		border: none;
		color: var(--background);
		border-radius: 1rem;
		font-size: 1.6rem;
		cursor: pointer;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25%,
		75% {
			transform: translateX(-0.5rem);
		}
		50% {
			transform: translateX(0.5rem);
		}
	}

	.error {
		animation: shake 0.5s;
	}

	@media screen and (min-width: 330px) {
		dialog form .select label {
			display: block;
		}
	}

	@media screen and (min-width: 1200px) {
		.cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
