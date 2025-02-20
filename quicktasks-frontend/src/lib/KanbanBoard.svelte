<script lang="ts">
    import TaskColumn from '../routes/dashboard/TaskColumn.svelte';
    import TaskModal from '../routes/dashboard/TaskModal.svelte';
    import type { Task, TaskStatus } from '$lib/types';

    export let tasks: Task[];
    export let handleDrop: (taskId: number, newStatus: TaskStatus)=> Promise <void>; 
    export let deleteTask: (TaskId:number)=>void;
    import { onMount } from 'svelte';

    let selectedTask: Task | null = null;
    let selectedColumn:TaskColumn;

    let statuses: TaskStatus[];
    function updateTask(updatedTask: Task) {
        tasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );
        selectedTask = null; // Ferme la modale après mise à jour
    }

    onMount(async () => {
        try {
            const res = await fetch('http://localhost:3000/task-status');
            if (!res.ok) {
            throw new Error('Error when retrieving Status');
            }
            statuses = await res.json();
            statuses = statuses.slice().sort((a, b) => b.sequence - a.sequence)
        } catch (error) {
            console.error('Fetch error', error);
        }
    });

</script>

<!-- Kanban Board -->
<div class="kanban-board grid grid-cols-3 gap-4 p-4">
    {#each statuses as status}
        <TaskColumn
            {status} 
            tasks={tasks.filter((task: Task) => task.statusId === status.id)} 
            {handleDrop} 
            {deleteTask}
            on:editTask={(event) => {
            selectedTask = event.detail;
            }}
            on:editColumn={(event) => {
                selectedColumn = event.detail;
            }}
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
        height: 100vh;
    }
</style>
