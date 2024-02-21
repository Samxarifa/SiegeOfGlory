<script lang="ts">
	// Component Used to show header and nav on all dashboard pages, also is content wrapped

	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
</script>

<header>
	<h1>Siege Of Glory</h1>
	<button on:click={() => signOut(auth)}
		>Sign Out <img class="svg_icon" src="/icons/logout.svg" alt="Logout Icon" /></button
	>
</header>
<div class="content">
	<slot />
</div>
<nav>
	<ul>
		<li>
			<a href="/dashboard"><img class="svg_icon" src="/icons/home.svg" alt="Home Icon" />Home</a>
		</li>
		<li>
			<a href="/dashboard/friends"
				><img class="svg_icon" src="/icons/friends.svg" alt="Friends Icon" />Friends</a
			>
		</li>
		<li>
			<a href="/dashboard"><img class="svg_icon" src="/icons/list.svg" alt="List Icon" />Lineup</a>
		</li>
		<li>
			<a href="/dashboard/profile"
				><img class="svg_icon" src="/icons/profile.svg" alt="Battle Icon" />Profile</a
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
	}

	.content {
		margin: 0 auto;
		padding: 1rem;
		padding-bottom: 7rem;
		max-width: 150rem;
		overflow: hidden;
	}

	nav {
		width: 100%;
		height: 7rem;
		background-color: var(--foreground);
		position: fixed;
		bottom: 0;
		color: var(--text);
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
	}

	@media screen and (min-width: 900px) {
		header {
			justify-content: space-between;
			padding: 0 2rem;
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
	}
</style>
