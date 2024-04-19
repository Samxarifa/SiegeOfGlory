<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { auth, googleProvider, microsoftProvider, loading } from '$lib/firebase/firebase';
	import { signInWithPopup } from 'firebase/auth';

	// Var to hold error returned by Firebase
	let error: { [key: string]: string } = {};

	function handleGoogleSignIn() {
		error = {};
		// Shows Google Sign In Page
		signInWithPopup(auth, googleProvider).catch((e) => {
			error = e;
		});
	}

	function handleMicrosoftSignIn() {
		error = {};
		// Shows Microsoft Sign In Page
		signInWithPopup(auth, microsoftProvider).catch((e) => {
			error = e;
		});
	}
</script>

<div class="signIn">
	<header>
		<span class="welcome">Welcome to</span>
		<h1>Siege of Glory</h1>
	</header>
	{#if error.code === 'auth/account-exists-with-different-credential'}
		<p class="error">Error: Email Registered With Different Provider</p>
	{:else if error.code && error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request'}
		<p class="error">Error: {error.message}</p>
	{/if}
	<main>
		{#if $loading}
			<LoadingSpinner />
		{:else}
			<button on:click={handleGoogleSignIn}>
				<img src="icons/google.webp" alt="Google Logo" /><span>Continue With Google</span>
			</button>
			<button on:click={handleMicrosoftSignIn}>
				<img src="icons/microsoft.webp" alt="Microsoft Logo" /><span>Continue With Microsoft</span>
			</button>
		{/if}
	</main>
</div>

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
		position: relative;
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
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
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

	.error {
		color: red;
		position: absolute;
		top: 50%;
		transform: translateY(-200%);
		width: 100%;
		text-align: center;
	}

	@media screen and (max-width: 370px) {
		:root {
			font-size: 50%;
		}
	}
</style>
