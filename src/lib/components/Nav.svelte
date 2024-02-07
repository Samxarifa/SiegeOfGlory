<nav>
    <ul>
        <li><a href="/dashboard">Home</a></li>
        <li><a href="/dashboard">Battles</a></li>
        <li><a href="/dashboard">Friends</a></li>
        <li><a href="/dashboard">LB</a></li>
    </ul>
</nav>

<style>
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
    }
</style>