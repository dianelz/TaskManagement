<script lang="ts">
    import TaskColumn from '../routes/dashboard/TaskColumn.svelte';
    import type { Task, Status } from '$lib/types';
  
    export let tasks: Task[];
    export let handleDrop: (taskId: number, newStatus: Status) => void;
  
    const statuses: Status[] = ['TODO', 'IN PROGRESS', 'DONE'];
  </script>
  
  <div class="kanban-board grid grid-cols-3 gap-4 p-4">
    {#each statuses as status}
      <TaskColumn 
        {status} 
        tasks={tasks.filter((task: Task) => task.status === status)} 
        {handleDrop} 
      />
    {/each}
  </div>
  
  <style>
    .kanban-board {
      background-color: #f9fafb;
      padding: 16px;
      border-radius: 8px;
    }
  </style>
  