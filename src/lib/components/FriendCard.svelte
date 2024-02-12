<script lang="ts">
    export let username: string;
    export let showButton: boolean = true;
</script>

<div>
    <span>{username}</span>
    {#if showButton}
        <button>Start Battle</button>
    {/if}
</div>

<style>
    div {
        background-color: var(--foreground);
        height: 7rem;
        border-radius: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        color: var(--text);
    }

    button {
        background-color: transparent;
        border: solid 0.2rem var(--text);
        padding: 1rem;
        border-radius: 1rem;
        color: var(--text);
        cursor: pointer;
    }
</style>