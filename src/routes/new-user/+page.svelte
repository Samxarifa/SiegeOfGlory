<script lang="ts">
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";


	import { SignedIn, SignedOut } from "sveltefire";

</script>

<SignedIn>
    <div class='linkAccount'>
        <header>
            <h1>Link Account</h1>
            <span class='caption'>Enter Your Rainbow Details</span>
        </header>
        <main>
            <form action="?/register" method="POST">
                <input name='username' id='username' type="text" placeholder="username"/>
                <select name="platform" id="platform">
                    <option value="psn">PSN</option>
                    <option value="xbl">Xbox</option>
                    <option value="ubi">PC</option>
                </select>
                <button type="submit">Link Account</button>
            </form>
        <main>
    </div>
</SignedIn>

<SignedOut>
    <div class="spinner-parent">
        <LoadingSpinner />
    </div>
</SignedOut>


<style>
    .spinner-parent {
        width: 100%;
        height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
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
        background: linear-gradient(to right, var(--blue), var(--text) , var(--orange));
        background-clip: text;
        color: transparent;
        font-size: 5rem;
        width: fit-content;
        position: relative;
        padding-bottom: 1rem;
        margin-bottom: 2rem;
    }

    h1::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 0.5rem;
        border-radius: 1rem;
        bottom: 0;
        left: 0;
        background: linear-gradient(to right, var(--blue), var(--text) , var(--orange));
        animation:slide-in 10s ease-out infinite
    }

    main {
        flex: 1;
        width: 100%;
    }
</style>