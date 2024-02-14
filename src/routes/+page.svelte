<script lang="ts">
	import { SignedIn, SignedOut } from 'sveltefire';
	import { auth, googleProvider } from '$lib/firebase/firebase';
	import { signInWithPopup } from 'firebase/auth';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	function handleGoogleSignIn() {
		// Shows Google Sign In Page
		signInWithPopup(auth, googleProvider);
	}
</script>

<SignedOut>
	<div class="signIn">
		<header>
			<span class="welcome">Welcome to</span>
			<h1>Siege of Glory</h1>
		</header>
		<main>
			<button on:click={handleGoogleSignIn}
				><img src="icons/google.webp" alt="Google Logo" /><span>Continue With Google</span></button
			>
			<main></main>
		</main>
	</div>
</SignedOut>

<SignedIn>
	<div class="spinner-parent">
		<LoadingSpinner />
	</div>
</SignedIn>

<style>
	@keyframes slide-in {
		0% {
			transform-origin: bottom left;
			transform: scaleX(0);
		}
		10% {
			transform-origin: bottom left;
			transform: scaleX(1);
		}
		80% {
			transform-origin: bottom right;
			transform: scaleX(1);
		}
		90% {
			transform-origin: bottom right;
			transform: scaleX(0);
		}
		100% {
			transform-origin: bottom left;
			transform: scaleX(0);
		}
	}

	.signIn {
		width: 100%;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		color: var(--text);
		padding: 2.5rem;
	}

	header {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.welcome {
		font-size: 2.4rem;
	}

	h1 {
		background: linear-gradient(to right, var(--blue), var(--text), var(--orange));
		background-clip: text;
		color: transparent;
		font-size: 5rem;
		width: fit-content;
		position: relative;
		padding-bottom: 1rem;
		margin-bottom: 2rem;
	}

	h1::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 0.5rem;
		border-radius: 1rem;
		bottom: 0;
		left: 0;
		background: linear-gradient(to right, var(--blue), var(--text), var(--orange));
		animation: slide-in 10s ease-out infinite;
	}

	main {
		flex: 1;
		width: 100%;
	}

	button {
		padding: 1.5rem 2rem;
		height: 7rem;
		width: 100%;
		background-color: var(--foreground);
		border: solid var(--text) 0.3rem;
		border-radius: 1rem;
		color: var(--text);
		display: flex;
		align-items: center;
		gap: 2rem;
		cursor: pointer;
		max-width: 50rem;
		margin: 0 auto;
	}

	button img {
		height: 100%;
	}

	button span {
		display: flex;
		justify-content: center;
		flex: 1;
		font-size: 2rem;
	}

	@media screen and (max-width: 370px) {
		:root {
			font-size: 50%;
		}
	}
</style>
