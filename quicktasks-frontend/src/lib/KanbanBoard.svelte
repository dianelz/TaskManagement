<script lang="ts">
    import TaskColumn from '../routes/dashboard/TaskColumn.svelte';
    import TaskModal from '../routes/dashboard/TaskModal.svelte';
    import type { Task, Status } from '$lib/types';

    export let tasks: Task[];
    export let handleDrop: (taskId: number, newStatus: string)=> Promise <void>;


    let selectedTask: Task | null = null;

    const statuses: Status[] = ['TODO', 'IN_PROGRESS', 'DONE'];
    function updateTask(updatedTask: Task) {
        tasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );
    }
        selectedTask = null; // Ferme la modale après mise à jour
</script>

<!-- Kanban Board -->
<div class="kanban-board grid grid-cols-3 gap-4 p-4">
    {#each statuses as status}
        <TaskColumn 
            {status} 
            tasks={tasks.filter((task: Task) => task.status === status)} 
            {handleDrop} 
            on:editTask={(event) => selectedTask = event.detail} 
        />
    {/each}
</div>

<!-- Modale pour l'édition d'une tâche -->
<TaskModal bind:selectedTask onSave={updateTask} />

<style>
    .kanban-board {
        background-color: #f9fafb;
        padding: 16px;
        border-radius: 8px;
    }
</style>
