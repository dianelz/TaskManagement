<script lang="ts">
    export let task: { id: number; title: string; description?: string; dueDate?: string; status: string };
  </script>
  
  <div
    role="listitem"
    class="p-4 bg-white rounded-lg shadow-md mb-2 cursor-move"
    draggable="true"
    on:dragstart={(event: DragEvent) => event.dataTransfer?.setData('taskId', task.id.toString())}
  >
    <h3 class="font-bold text-lg">{task.title}</h3>
    {#if task.description}
      <p class="text-gray-600">{task.description}</p>
    {/if}
    {#if task.dueDate}
      <p class="text-sm text-red-500">Échéance : {task.dueDate}</p>
    {/if}
  </div>
  