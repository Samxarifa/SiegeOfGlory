<div class="content">
    <slot />
</div>
<nav>
    <ul>
        <li><a href="/dashboard"><img  class="svg_icon" src="icons/home.svg" alt="Home Icon"/>Home</a></li>
        <li><a href="/dashboard"><img  class="svg_icon" src="icons/battle.svg" alt="Battle Icon"/>Battles</a></li>
        <li><a href="/dashboard"><img  class="svg_icon" src="icons/friends.svg" alt="Friends Icon"/>Friends</a></li>
        <li><a href="/dashboard"><img  class="svg_icon" src="icons/list.svg" alt="List Icon"/>LB</a></li>
    </ul>
</nav>

<style>
    .content {
        margin: 1rem;
        margin-bottom: 8rem;
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
</style>