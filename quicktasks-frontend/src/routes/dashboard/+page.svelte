<script lang="ts">
  import { onMount } from 'svelte';

  let tasks = [];
  let newTask = '';

  async function fetchTasks() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    tasks = await response.json();
  }

  async function addTask() {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ title: newTask, userId: 1 }),
    });
    newTask = '';
    fetchTasks();
  }

  onMount(fetchTasks);
</script>

<h1>Tableau de Bord</h1>
<input type="text" bind:value={newTask} placeholder="Nouvelle tâche" />
<button on:click={addTask}>Ajouter</button>

<ul>
  {#each tasks as task}
    <li>{task.title}</li>
  {/each}
</ul>

<button on:click={() => {
  localStorage.removeItem('token');
  window.location.href = '/login';
}}>Se déconnecter</button>
