<script lang="ts">
	export let id: string;
	export let pos: number;
	export let username: string;
	export let wins: number;
	export let losses: number;
</script>

<div class="item">
	<div class="pos">{pos}</div>
	<img
		src={'https://api.dicebear.com/7.x/thumbs/svg?' +
			new URLSearchParams({
				seed: id
			})}
		alt="Profile Pic"
		class="profile_pic"
	/>
	<div class="div_username">
		<div class="username">{username.slice(0, -4)}</div>
		<div class="platform">{username.slice(-3)}</div>
	</div>
	<div class="scores">
		<div class="wins">
			<img src="/icons/trophy.svg" alt="Trophy Icon" class="svg_icon" />
			{wins}
		</div>
		<div class="losses">
			<img src="/icons/skull.svg" alt="Skull Icon" class="svg_icon" />
			{losses}
		</div>
	</div>
</div>

<style>
	.item {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 1rem;
		background: var(--foreground);
		border-radius: 1rem;
		color: var(--text);
		width: 100%;
	}
	.pos {
		font-size: 3rem;
		background-color: var(--text);
		border-radius: 50%;
		height: 4rem;
		aspect-ratio: 1 / 1;
		color: var(--background);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.div_username {
		display: flex;
		flex-direction: column;
		flex: 3;
	}
	.username {
		font-size: 1.6rem;
	}
	.platform {
		font-size: 1.2rem;
		color: gray;
		font-style: italic;
	}

	.scores {
		flex: 1;
	}

	.scores * {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.scores img {
		width: 1.5rem;
	}

	.profile_pic {
		width: 4rem;
		height: 4rem;
		border-radius: 1rem;
	}

	@media screen and (min-width: 525px) {
		.scores {
			display: flex;
			gap: 20%;
			font-size: 2rem;
		}

		.scores img {
			width: 2rem;
		}
	}
</style>
