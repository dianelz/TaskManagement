<script lang="ts">
    import type { Task } from '$lib/types'; // Importer le type
    import { createEventDispatcher } from 'svelte';

    export let task: Task;

    const dispatch = createEventDispatcher();

    function editTask() {
        dispatch('editTask', task);
    }

    function deleteTask(event:MouseEvent){
        event.stopPropagation();
        dispatch('deleteTask',task.id)
    }
    
</script>
  
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="relative p-4 bg-white rounded-lg shadow-md mb-2 cursor-move"
  draggable="true"
  on:dragstart={(event: DragEvent) => event.dataTransfer?.setData('taskId', task.id.toString())}
  on:click={editTask}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      editTask();
    }
  }}
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <span
    class="absolute top-2 right-2 text-xl text-pink-600 hover:text-pink-800 cursor-pointer"
    on:click={(event) => {
      event.stopPropagation(); 
      deleteTask(event);
    }}
  >
    &times;
  </span>

  <h3 class="font-bold text-lg">{task.title}</h3>
  {#if task.description}
    <p class="text-gray-600">{task.description}</p>
  {/if}
  {#if task.dueDate}
    <p class="text-sm text-pink-600"> {new Date(task.dueDate).toLocaleDateString()}</p>
  {/if}
</div>

