<script lang="ts">
	import { auth } from '$lib/firebase/firebase';
	import { userStore } from 'sveltefire';

	// Get Props Passed in from component decleration
	export let opponent: string;
	export let stat: string;
	export let time: string;

	const user = userStore(auth);
</script>

<div class="card">
	<span class="you">{$user?.displayName}</span>
	<div class="details">
		<img class="svg_icon" src="icons/battle.svg" alt="Battle Icon" />
		<span>{time}</span>
		<span>{stat}</span>
	</div>
	<span class="opponent">{opponent}</span>
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
		justify-content: space-between;
		align-items: center;
	}

	.details {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		font-size: 1.2rem;
	}

	.you {
		text-shadow: 0 0 30px var(--blue);
		flex: 1;
		color: var(--blue);
	}

	.opponent {
		text-shadow: 0 0 30px var(--orange);
		flex: 1;
		text-align: right;
		color: var(--orange);
	}
</style>
