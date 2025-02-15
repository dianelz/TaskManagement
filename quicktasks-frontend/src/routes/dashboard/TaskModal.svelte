<script lang="ts">
  import { writable } from 'svelte/store';
  import { tasks } from '$lib/store'; // Import du store global
  import type { Task } from '$lib/types';

  export let selectedTask: Task | null;
  export let onSave: (task: Task) => void; // Fonction passée en prop

  function saveChanges() {
      if (selectedTask) {
          onSave(selectedTask);
          selectedTask = null; // Ferme la modale
      }
  }
</script>

<!-- Modale -->
{#if selectedTask}
<div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-bold mb-4">Modifier la tâche</h2>

      <label class="block mb-2">Titre</label>
      <input type="text" bind:value={selectedTask.title} class="border p-2 w-full mb-4" />

      <label class="block mb-2">Description</label>
      <textarea bind:value={selectedTask.description} class="border p-2 w-full mb-4"></textarea>

      <label class="block mb-2">Échéance</label>
      <input type="date" bind:value={selectedTask.dueDate} class="border p-2 w-full mb-4" />

      <div class="flex justify-end">
          <button on:click={() => selectedTask = null} class="mr-2 px-4 py-2 bg-gray-300 rounded">Annuler</button>
          <button on:click={saveChanges} class="px-4 py-2 bg-blue-500 text-white rounded">Enregistrer</button>
      </div>
  </div>
</div>
{/if}
