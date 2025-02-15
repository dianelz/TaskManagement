<script lang="ts">
    import type { Task } from '$lib/types'; // Importer le type
    import { createEventDispatcher } from 'svelte';

    export let task: Task;

    const dispatch = createEventDispatcher();

    function editTask() {
        console.log("CLIC CLIC")
        console.log(task)
        dispatch('editTask', task);
    }
</script>
  
<div
  class="p-4 bg-white rounded-lg shadow-md mb-2 cursor-move"
  draggable="true"
  on:dragstart={(event: DragEvent) => event.dataTransfer?.setData('taskId', task.id.toString())}
  on:click={editTask}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      editTask();
    }
  }}
>
  <h3 class="font-bold text-lg">{task.title}</h3>
  {#if task.description}
    <p class="text-gray-600">{task.description}</p>
  {/if}
  {#if task.dueDate}
    <p class="text-sm text-red-500">Échéance : {task.dueDate}</p>
  {/if}
</div>


