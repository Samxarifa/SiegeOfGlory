<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import FriendCard from '$lib/components/FriendCard.svelte';

	export let data;

	let modalData: {
		modal: HTMLDialogElement | undefined;
		id: string;
		name: string;
		statType: string;
		confirm: boolean;
	} = {
		modal: undefined,
		id: '',
		name: '',
		statType: '',
		confirm: false
	};
</script>

<div class="top">
	<h1>Friends</h1>
	<a href="./friends/add-friend">Add<img class="svg_icon" src="/icons/personAdd.svg" alt="" /></a>
</div>

<main>
	<button class="requests" on:click={() => goto('./friends/requests')}>
		<span>Friend Requests</span>
		<img src="/icons/arrowRight.svg" alt="Arrow Right" />
	</button>
	{#if data.friends && data.friends.length > 0}
		<div class="cards">
			{#each data.friends as friend}
				<FriendCard username={friend.username} id={friend.userId} bind:modalData showBattleButton />
			{/each}
		</div>
	{:else}
		<span class="noFriend">Click add to find a new Friend</span>
	{/if}
	<dialog bind:this={modalData.modal}>
		<button class="dialog_close" on:click={() => modalData.modal?.close()}>
			<img class="svg_icon" src="/icons/cross.svg" alt="Cross Icon" />
		</button>
		<div class="dialog_inner">
			<h2>Start Battle With:</h2>
			<span class="dialog_username">{modalData.name}</span>
			<div class="dates">
				<span>
					<b>{new Date(Date.now() + 1000 * 60 * 60 * 24).toLocaleDateString('en-GB')}</b>
				</span>
				<span>-</span>
				<span>
					<b>{new Date(Date.now() + 1000 * 60 * 60 * 48).toLocaleDateString('en-GB')}</b>
				</span>
			</div>
			<form action="#" method="POST" use:enhance on:submit={() => (modalData.confirm = true)}>
				<div class="select">
					<label for="statType">Stat Type: </label>
					<select name="statType" id="statType" bind:value={modalData.statType}>
						<option value="" disabled selected>Select Stat</option>
						<option value="k">Most Kills</option>
						<option value="d">Least Deaths</option>
						<option value="w%">Win%</option>
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
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.noFriend {
		color: var(--text);
		display: block;
		text-align: center;
	}

	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--foreground);
		color: var(--text);
		/* width: 40rem; */
		width: calc(100vw - 6rem);
		max-width: 40rem;
		height: 40rem;
		border: solid 0.2rem var(--text);
		border-radius: 1rem;
		padding: 1rem;
		overflow: visible;
	}

	.dialog_close {
		position: absolute;
		background-color: var(--orange);
		right: 0;
		top: 0;
		transform: translate(+50%, -50%);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dialog_close img {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
	}

	.dialog_inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		height: 100%;
		overflow: hidden;
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

	dialog form {
		display: flex;
		align-items: center;
		flex-direction: column;
		flex: 1;
	}

	dialog form .select {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		font-size: 2.4rem;
		margin-top: 2rem;
	}

	dialog form select {
		background-color: var(--foreground);
		border: solid 0.2rem var(--text);
		border-radius: 1rem;
		padding: 1rem;
		color: inherit;
		font-size: 2.4rem;
		font-weight: bold;
		cursor: pointer;
	}

	dialog form button {
		margin-top: auto;
		padding: 1rem 2rem;
		background-color: var(--foreground);
		border: solid 0.2rem var(--text);
		color: inherit;
		border-radius: 1rem;
		font-size: 2.4rem;
		cursor: pointer;
	}

	@media screen and (min-width: 450px) {
		dialog form .select {
			flex-direction: row;
		}
	}
</style>
