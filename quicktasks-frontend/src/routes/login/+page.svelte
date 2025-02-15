<script lang="ts">
  import { onMount } from 'svelte';
  import KanbanBoard from '$lib/KanbanBoard.svelte';
  import type { Status, Task } from '$lib/types';

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

  function handleDrop(taskId: number, newStatus: Status) {
    console.log(`🔄 Changement du statut de la tâche ${taskId} en ${newStatus}`);
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
  }

  onMount(fetchTasks);
</script>
