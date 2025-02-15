<script lang="ts">
    import type { Task, Status } from '$lib/types';
    import TaskCard from './TaskCard.svelte';
  
    export let status: Status;
    export let tasks: Task[];
    export let handleDrop: (taskId: number, newStatus: Status) => void;
  
    function onDrop(event: DragEvent) {
      event.preventDefault();
      const taskId = event.dataTransfer?.getData('taskId');
  
      if (!taskId) {
        return;
      }
      handleDrop(Number(taskId), status);
    }
  </script>
  
  <div class="kanban-column"
    on:dragover={(event) => event.preventDefault()}
    on:drop={onDrop}
    role="list"
  >
    <h2 class="text-lg font-bold">{status.replace("_"," ")}</h2>
    {#each tasks as task (task.id)}
      <TaskCard {task} onEdit={() => {}} />
    {/each}
  </div>