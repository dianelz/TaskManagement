<script lang="ts">
  import '../../app.css';
  import { onMount } from 'svelte';
  import KanbanBoard from '$lib/KanbanBoard.svelte';
  import type { Status, Task } from '$lib/types';

// ✅ Tâches initiales
 let tasks: Task[] = [
  { id: 1, title: 'Tâche 1', description: 'Description 1', status: 'TODO', dueDate: '2025-02-10' },
  { id: 2, title: 'Tâche 2', description: 'Description 2', status: 'IN PROGRESS' },
  { id: 3, title: 'Tâche 3', description: 'Description 3', status: 'DONE' },
];

  let newTask = '';

  async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    tasks = await response.json();
  }

  async function addTask() {
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask, userId: 1 }),
    });
    newTask = '';
    fetchTasks();
  }

  
  function handleDrop(taskId: number, newStatus: string) {
    console.log(`🔄 Changement du statut de la tâche ${taskId} en ${newStatus}`);
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus as Status } : task
    );
  }

  onMount(fetchTasks);
</script>

<h1 class="text-3xl font-bold text-center my-4">QuickTasks - Kanban Board</h1>

<div class="flex justify-center mb-4">
  <input type="text" bind:value={newTask} placeholder="Nouvelle tâche"
         class="border p-2 rounded-l-md" />
  <button on:click={addTask} class="bg-blue-500 text-white px-4 py-2 rounded-r-md">
    Ajouter
  </button>
</div>

<KanbanBoard {tasks} {handleDrop} />

<button on:click={() => {
  localStorage.removeItem('token');
  window.location.href = '/login';
}} class="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
  Se déconnecter
</button>
