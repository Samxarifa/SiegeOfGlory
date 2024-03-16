<script lang="ts">
	import { fly } from 'svelte/transition';

	export let pos: number;
	export let username: string;
	export let wins: number;
	export let losses: number;
</script>

<div class="card {pos === 1 && 'first'}" in:fly={{ y: 100, delay: (3 - pos) * 200 }}>
	<div class="inner">
		<img
			src={'https://api.dicebear.com/7.x/thumbs/svg?' +
				new URLSearchParams({
					seed: username
				})}
			alt="Profile Pic"
			class="profile_pic"
		/>
		<div class="div_username">
			<span class="username">{username.slice(0, -4)}</span>
			<span class="platform">{username.slice(-3)}</span>
		</div>
		<div class="score">
			<span class="wins"
				><img src="/icons/trophy.svg" alt="Trophy Icon" class="svg_icon" /> {wins}</span
			>
			<span class="losses"
				><img src="/icons/skull.svg" alt="Skull Icon" class="svg_icon" /> {losses}</span
			>
		</div>
	</div>
	<span class="pos">{pos}</span>
</div>

<style>
	.card {
		width: 100%;
		max-width: 15rem;
		padding-bottom: 2rem;
		position: relative;
		height: min-content;
		overflow: hidden;
	}

	.inner {
		width: 100%;
		background: var(--foreground);
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		color: var(--text);
		padding: 1rem;
		overflow: visible;
	}

	.first {
		transform: scale(1.05);
	}

	.first .inner {
		border: solid 0.2rem var(--text);
	}

	.profile_pic {
		border-radius: 1rem;
	}

	.pos {
		font-size: 3rem;
		background-color: var(--text);
		border-radius: 50%;
		height: 4rem;
		aspect-ratio: 1 / 1;
		color: var(--background);
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translate(-50%, 50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.div_username {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.username {
		font-size: 1.2rem;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
	}

	.platform {
		font-size: 1.2rem;
		color: gray;
		font-style: italic;
	}

	.score {
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}

	.score span {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.losses img {
		width: 1.2rem;
	}

	.wins {
		font-size: 2rem;
	}

	.wins img {
		width: 2rem;
	}
</style>
