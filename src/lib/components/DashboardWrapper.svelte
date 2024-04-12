<script lang="ts">
	// Component Used to show header and nav on all dashboard pages, also is content wrapped
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
	import { fade } from 'svelte/transition';

	// Gets url from parent component (Used to cause fade transition on navigation)
	export let url: string;

	export let currentUser: string;

	// Used to stop navigation if already on the page
	async function navigateTo(to: string) {
		if (url !== to) {
			await goto(to);
		}
	}

	// Array of destinations for nav
	const destinations = [
		{ name: 'Home', icon: 'home.svg', url: '/dashboard' },
		{ name: 'History', icon: 'history.svg', url: '/dashboard/history' },
		{ name: 'Friends', icon: 'friends.svg', url: '/dashboard/friends' },
		{ name: 'Leaderboard', icon: 'leaderboard.svg', url: '/dashboard/leaderboard' }
	];
</script>

<header>
	<h1>Siege Of Glory</h1>
	<button on:click={() => signOut(auth)}
		>Sign Out <img class="svg_icon" src="/icons/logout.svg" alt="Logout Icon" /></button
	>
</header>
{#key url}
	<div class="content" in:fade>
		<slot />
	</div>
{/key}
<nav>
	<ul>
		{#each destinations as destination}
			<li>
				<a href={destination.url} on:click|preventDefault={() => navigateTo(destination.url)}
					><img
						class="svg_icon"
						src="/icons/{url === destination.url ? '' : 'outlined/'}{destination.icon}"
						alt={destination.name + ' Icon'}
					/><span>{destination.name}</span></a
				>
			</li>
		{/each}
		<li>
			<a
				href="/dashboard/profile/{currentUser}"
				on:click|preventDefault={() => navigateTo(`/dashboard/profile/${currentUser}`)}
				><img
					src={'https://api.dicebear.com/7.x/thumbs/svg?' +
						new URLSearchParams({
							seed: currentUser
						})}
					alt="Profile Pic"
					class="profile_pic {url === '/dashboard/profile/' + currentUser
						? 'profile_selected'
						: ''}"
				/><span>Profile</span></a
			>
		</li>
	</ul>
</nav>

<style>
	header {
		margin-top: 1rem;
		height: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	header button {
		display: none;

		padding: 1rem;
		background-color: var(--foreground);
		border: solid 0.2rem var(--text);
		border-radius: 1rem;
		color: var(--text);
		align-items: center;
		justify-content: center;
		gap: 1rem;
		cursor: pointer;
	}

	h1 {
		background: linear-gradient(to right, var(--blue), var(--text), var(--orange));
		background-clip: text;
		color: transparent;
		font-size: 3rem;
		width: fit-content;
		position: relative;
		z-index: 10;
	}

	.content {
		margin: 0 auto;
		padding: 1rem;
		padding-top: 7rem;
		padding-bottom: calc(8rem + env(safe-area-inset-bottom));
		max-width: 150rem;
		overflow-x: hidden;
		/* IOS PWA Safe Areas */
		border-left: solid env(safe-area-inset-left) var(--background);
		border-right: solid env(safe-area-inset-right) var(--background);
	}

	nav {
		width: 100%;
		height: 7rem;
		background-color: var(--foreground);
		position: fixed;
		bottom: 0;
		color: var(--text);
		/* IOS PWA Safe Areas */
		box-sizing: content-box;
		border-bottom: solid env(safe-area-inset-bottom) var(--foreground);
	}

	ul {
		display: flex;
		list-style: none;
		color: inherit;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}

	li {
		height: 100%;
		flex: 1;
	}

	a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: inherit;
		text-decoration: none;
		flex-direction: column;

		& span {
			display: none;
		}

		& img {
			width: 3rem;
			height: 3rem;
		}
	}

	.profile_pic {
		width: 2.6rem;
		height: 2.6rem;
		margin-block: 0.2rem;
		border-radius: 50%;
	}

	.profile_selected {
		outline: solid 0.3rem var(--text);
	}

	@media screen and (min-width: 900px) {
		header {
			margin-top: 0;
			height: 7rem;
			justify-content: space-between;
			padding: 0 2rem;
			position: fixed;
			top: 0;
			width: 100%;
			background-color: var(--background);
		}

		header button {
			display: flex;
		}

		.content {
			padding-bottom: 1rem;
			padding-left: 32rem;
		}

		nav {
			bottom: unset;
			width: 30rem;
			height: calc(100dvh - 2rem);
			top: 6rem;
			left: 0;
			margin: 1rem;
			background-color: var(--background);
		}

		ul {
			flex-direction: column;
			justify-content: unset;
			gap: 1rem;
		}

		li {
			width: 100%;
			flex: none;
			height: auto;
		}

		a {
			background-color: var(--foreground);
			border-radius: 1rem;
			padding: 2rem;
			flex-direction: row;
			justify-content: flex-start;
			gap: 4rem;
		}

		a span {
			display: block;
		}

		a img {
			width: 2.4rem;
			height: 2.4rem;
		}

		.profile_pic {
			width: 2rem;
			height: 2rem;
		}
	}
</style>
