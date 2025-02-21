<script lang="ts">
    import Portal from "svelte-portal";
    import { createEventDispatcher } from "svelte";
    import type { TaskStatus } from "$lib/types";

    export let status: TaskStatus;
    export let isMenuOpen;
    export let menuPosition;

    const dispatch = createEventDispatcher();
</script>

{#if isMenuOpen}
    <Portal target="body">
        <ul
            class="fixed bg-white border border-gray-300 shadow-lg rounded-lg text-sm p-2 z-[1000]"
            style="top: {menuPosition.top}px; left: {menuPosition.left}px;"
        >
            <li
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                on:click={() => dispatch("edit")}
            >
                Edit
            </li>
            <li
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                on:click={() => dispatch("delete", status?.id)}
            >
                Delete
            </li>
            <li
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                on:click={() => dispatch("add")}
            >
                Add
            </li>
        </ul>
    </Portal>
{/if}
