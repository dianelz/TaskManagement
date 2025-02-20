<script lang="ts">
  import '../../app.css';
  import { onMount } from 'svelte';
  import KanbanBoard from '$lib/KanbanBoard.svelte';
  import type {Task, TaskStatus } from '$lib/types';
  

let tasks: Task[] = []; // Tableau local de tâches
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

  
  async function handleDrop(taskId: number, newStatus: TaskStatus): Promise<void>{
    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }), // On envoie la version correcte du statut
        });
        console.log(response);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }
        const updatedTask = await response.json();
        console.log(updatedTask);

        tasks = tasks.map((task) =>
            task.id === taskId ? { ...task, statusId: updatedTask.statusId } : task
        );

    } catch (error) {
        console.error(`Error when uptadting Task`, error);
    }

}

  async function deleteTask(taskId: number) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error when deleting task:');
      }

      tasks = tasks.filter(t => t.id !== taskId);
    } catch (error) {
      console.error(`Unable to delete Task`, error);
    }
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

<KanbanBoard {tasks} 
  {handleDrop}
  {deleteTask}
/>

<button on:click={() => {
  localStorage.removeItem('token');
  window.location.href = '/login';
}} class="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
  Se déconnecter
</button>
