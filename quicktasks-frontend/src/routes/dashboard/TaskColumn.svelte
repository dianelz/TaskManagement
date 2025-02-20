<script lang="ts">
    import type { Task, TaskStatus } from '$lib/types';
    import { createEventDispatcher } from 'svelte';
    import TaskCard from './TaskCard.svelte';
  
    export let status: TaskStatus;
    export let tasks: Task[];
    export let handleDrop: (taskId: number, newStatus: TaskStatus) => void;
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

    function columnOptionModal(event: any){
      dispatch('editColumn',event.detail);
    }

  </script>
  
  <div class="sticky isolate rounded-2xl shadow-xl bg-white sm:py-10 lg:px-8"
    on:dragover={(event) => event.preventDefault()}
    on:drop={onDrop}
    role="list"
  >
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <span class="absolute top-2 text-xl right-5 font-semibold cursor-pointer "
    on:click={(event) => {
      event.stopPropagation(); 
      columnOptionModal(event);
    }}>
      ...
    </span>
    <h2 class="text-center text-lg font-bold ">{status.name.replace("_"," ")}</h2>
    {#each tasks as task (task.id)}
      <TaskCard {task} 
      on:editTask={forwardEditTask}
      on:deleteTask={(event) => deleteTask(event.detail)}
      />
    {/each}
  </div>