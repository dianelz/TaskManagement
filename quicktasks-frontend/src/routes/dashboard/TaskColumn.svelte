<script lang="ts">
    import type { Task, Status } from '$lib/types';
    import { createEventDispatcher } from 'svelte';
    import TaskCard from './TaskCard.svelte';
  
    export let status: Status;
    export let tasks: Task[];
    export let handleDrop: (taskId: number, newStatus: Status) => void;
    export let deleteTask: (taskId: number) => void; // passé en prop

    
    const dispatch = createEventDispatcher();

    function onDrop(event: DragEvent) {
      event.preventDefault();
      const taskId = event.dataTransfer?.getData('taskId');

  
      if (!taskId) {
        return;
      }
      handleDrop(Number(taskId), status);
    }

    function forwardEditTask(event :any) {
        dispatch('editTask', event.detail);
    }

  </script>
  
  <div class="kanban-column"
    on:dragover={(event) => event.preventDefault()}
    on:drop={onDrop}
    role="list"
  >
    <h2 class="text-lg font-bold">{status.replace("_"," ")}</h2>
    {#each tasks as task (task.id)}
      <TaskCard {task} 
      on:editTask={forwardEditTask}
      on:deleteTask={(event) => deleteTask(event.detail)}
      />
    {/each}
  </div>