<div></div>

<style>
	div {
		border: 1.6rem solid var(--foreground);
		border-top: 1.6rem solid var(--text);
		border-radius: 50%;
		width: 10rem;
		height: 10rem;
		animation: spin 0.5s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
