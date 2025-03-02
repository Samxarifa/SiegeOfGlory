<script lang="ts">
	import { enhance } from '$app/forms';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { auth } from '$lib/firebase/firebase.js';
	import { signOut } from 'firebase/auth';

	// Gets Return Errors (If any)
	export let form;
	// Shows Loading Spinner when form is submitted
	let submitted = false;

	// Reruns whenever form submit has returned from server (Using Sveltekit $: Syntax)
	$: {
		if (form && !form.success) {
			submitted = false;
		}
	}
</script>

<div class="linkAccount">
	<header>
		<h1>Link Account</h1>
		<span class="caption">Enter Your Rainbow Details</span>
	</header>
	<main>
		{#if form && !form?.success}
			<span class="error">Error: {form.message}</span>
		{/if}
		<form
			action="?/register"
			method="POST"
			use:enhance={(e) => {
				if (!e.formData.get('username')) {
					e.cancel();
					form = { success: false, message: 'Username is required' };
				} else {
					submitted = true;
				}
			}}
		>
			<div class="div_username">
				<input
					on:focus={() => (form = null)}
					name="username"
					id="username"
					type="text"
					placeholder="Username"
				/>
				<span>#</span>
				<select name="platform" id="platform">
					<option value="psn">PSN</option>
					<option value="xbl">Xbox</option>
					<option value="ubi">PC</option>
				</select>
			</div>
			<div class="submit"><button type="submit">Link Account</button></div>
		</form>
		<button on:click={() => signOut(auth)}>Sign Out</button>
	</main>
</div>
{#if submitted}
	<div class="spinner-infront">
		<LoadingSpinner />
	</div>
{/if}

<style>
	.spinner-infront {
		width: 100%;
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(18, 18, 18, 0.5);
		backdrop-filter: blur(0.5rem);
	}

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

	.error {
		text-align: center;
		display: block;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -5rem;
		color: red;
	}

	.linkAccount {
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

	.caption {
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
		gap: 2rem;
		position: relative;
	}

	.div_username {
		background-color: var(--foreground);
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 1rem;
		height: 5rem;
		margin: 2rem auto;
		max-width: 60rem;
		font-size: 2rem;
	}

	.div_username span {
		color: grey;
	}

	input {
		padding: 1rem;
		height: 100%;
		background-color: var(--foreground);
		border: none;
		color: var(--white);
		flex: 1;
		border-radius: 1rem;
		font-size: 2rem;
		width: 100%;
	}

	input:focus {
		outline: none;
	}

	.div_username:has(input:focus) {
		outline: solid 0.2rem var(--blue);
	}

	select {
		min-width: 10rem;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		background-color: var(--foreground);
		color: var(--text);
		border-radius: 1rem;
		font-size: 2rem;
	}

	.submit {
		width: 100%;
		display: flex;
	}

	button {
		width: 10rem;
		height: 5rem;
		background-color: var(--foreground);
		color: var(--text);
		border: solid 0.2rem var(--text);
		border-radius: 1rem;
		margin: 0 auto;
		cursor: pointer;
	}

	@media screen and (max-width: 370px) {
		:root {
			font-size: 50%;
		}
	}
</style>
