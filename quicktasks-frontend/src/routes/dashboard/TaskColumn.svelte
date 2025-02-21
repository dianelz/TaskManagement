<script lang="ts">
  import type { Task, TaskStatus } from "$lib/types";
  import { createEventDispatcher } from "svelte";
  import TaskCard from "./TaskCard.svelte";
  import TaskColumnOption from "./TaskColumnOption.svelte";

  export let status: TaskStatus;
  export let tasks: Task[];
  export let handleDrop: (taskId: number, newStatus: TaskStatus) => void;
  export let deleteTask: (taskId: number) => void;
  export let updateColumn: (updatedStatus: TaskStatus) => void;
  export let deleteColumn: (statusId: number) => void;
  export let isEditing = false;

  const dispatch = createEventDispatcher();

  let isMenuOpen = false;
  let menuPosition = { top: 0, left: 0 };
  let editedName = status.name;

  // Met à jour editedName si le statut change et qu'on n'est pas en train d'éditer
  $: if (!isEditing && status && editedName !== status.name) {
    editedName = status.name;
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    const taskId = event.dataTransfer?.getData("taskId");
    if (!taskId) return;
    handleDrop(Number(taskId), status);
  }

  function forwardEditTask(event: CustomEvent) {
    dispatch("editTask", event.detail);
  }

  function openMenu(event: MouseEvent) {
    event.stopPropagation();
    isMenuOpen = true;
    menuPosition = {
      top: event.clientY + window.scrollY,
      left: event.clientX,
    };
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function startEditing() {
    isEditing = true;
    closeMenu();
  }

  function saveColumn() {
    const newName = editedName.trim();
    if (newName !== "" && newName !== status.name) {
      updateColumn({ ...status, name: newName });
    }
    isEditing = false;
  }

  function addColumn() {
    dispatch("addColumn");
  }
</script>

<div
  class="sticky isolate rounded-2xl shadow-xl bg-white sm:py-10 lg:px-8"
  on:dragover={(event) => event.preventDefault()}
  on:drop={onDrop}
  role="list"
>
  <span
    class="absolute top-2 text-xl right-5 font-semibold cursor-pointer"
    on:click={openMenu}
  >
    ...
  </span>

  {#if isEditing}
    <input
      type="text"
      class="text-center text-lg font-bold border p-1 rounded w-full"
      bind:value={editedName}
      on:blur={saveColumn}
      on:keydown={(e: KeyboardEvent) => e.key === "Enter" && saveColumn()}
      autofocus
    />
  {:else}
    <h2 class="text-center text-lg font-bold">
      {status.name.replace("_", " ")}
    </h2>
  {/if}

  {#each tasks as task (task.id)}
    <TaskCard
      {task}
      on:editTask={forwardEditTask}
      on:deleteTask={(event: CustomEvent<number>) => deleteTask(event.detail)}
    />
  {/each}

  {#if isMenuOpen}
    <TaskColumnOption
      bind:isMenuOpen
      {menuPosition}
      {status}
      on:edit={startEditing}
      on:delete={(event: CustomEvent<number>) => deleteColumn(event.detail)}
      on:add={addColumn}
    />
  {/if}
</div>

<svelte:window on:click={closeMenu} />
