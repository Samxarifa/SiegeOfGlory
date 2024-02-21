<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<h1>Ruh Roh</h1>
	{#if ($page.status = 404)}
		<h2>This page has gone missing...</h2>
		<h2>Where did it go?</h2>
	{:else}
		<h2>The Website Blew Up...</h2>
		<h2>RIP</h2>
	{/if}

	<a href="/dashboard">Return to Safety</a>
	<span class="error">{$page.error?.message}</span>
</main>

<style>
	main {
		width: 100%;
		height: 100dvh;
		display: flex;
		padding: 1rem;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	h1,
	h2 {
		color: var(--text);
		text-align: center;
	}

	a {
		background-color: var(--foreground);
		padding: 1rem;
		border-radius: 1rem;
		color: var(--text);
		text-decoration: none;
		margin-top: auto;
	}

	.error {
		margin-top: auto;
		color: var(--text);
		opacity: 0.5;
	}
</style>
