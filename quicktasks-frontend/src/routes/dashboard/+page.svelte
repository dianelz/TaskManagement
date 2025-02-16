<script lang="ts">
  import '../../app.css';
  import { onMount } from 'svelte';
  import KanbanBoard from '$lib/KanbanBoard.svelte';
  import type { Status, Task } from '$lib/types';
  

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

  
  async function handleDrop(taskId: number, newStatus: string): Promise<void>{
    console.log(`🔄 Changement du statut de la tâche ${taskId} en ${newStatus}`);

    // 🔥 Vérification et conversion du statut avant l'envoi
    const statusMap: Record<string, string> = {
        "TODO": "TODO",
        "IN_PROGRESS": "IN_PROGRESS", // Correction ici
        "DONE": "DONE",
    };

    const formattedStatus = statusMap[newStatus];

    if (!formattedStatus) {
        console.error(`🚨 Erreur: statut "${newStatus}" invalide`);
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: formattedStatus }), // On envoie la version correcte du statut
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur API: ${errorText}`);
        }

        const updatedTask = await response.json();
        console.log(`✅ Mise à jour réussie en BDD:`, updatedTask);

        // Mettre à jour localement si nécessaire (si `tasks` est un store Svelte)
        tasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: updatedTask.status } : task
        );

    } catch (error) {
        console.error(`🚨 Erreur lors de la mise à jour de la tâche:`, error);
    }

}

  async function deleteTask(taskId: number) {
    try {
      // 1) Appel à l'API pour supprimer la tâche en BDD
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Erreur lors de la suppression de la tâche');
      }
      
      tasks = tasks.filter(t => t.id !== taskId);
      console.log(`✅ Tâche ${taskId} supprimée`);
    } catch (error) {
      console.error(`🚨 Impossible de supprimer la tâche :`, error);
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
