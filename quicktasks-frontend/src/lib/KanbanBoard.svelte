<script lang="ts">
    import TaskColumn from "../routes/dashboard/TaskColumn.svelte";
    import TaskModal from "../routes/dashboard/TaskModal.svelte";
    import type { Task, TaskStatus } from "$lib/types";
    import { onMount } from "svelte";
  
    export let tasks: Task[];
    export let handleDrop: (taskId: number, newStatus: TaskStatus) => Promise<void>;
    export let deleteTask: (taskId: number) => void;
  
    let selectedTask: Task | null = null;
    let statuses: TaskStatus[] = [];
    let newStatus: TaskStatus;
    const API_BASE_URL = "http://localhost:3000";
  
    function updateTask(updatedTask: Task) {
      tasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      selectedTask = null; // Ferme la modale après mise à jour
    }
  
    async function updateColumn(updatedStatus: TaskStatus) {
      statuses = statuses.map((status) =>
        status.id === updatedStatus.id ? updatedStatus : status
      );
      try {
        const res = await fetch(`${API_BASE_URL}/task-status/${updatedStatus.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: updatedStatus.name }),
        });
  
        if (!res.ok) {
          throw new Error("Error updating column");
        }
      } catch (error) {
        console.error("Error updating column", error);
      }
    }
  
    async function fetchStatus() {
      try {
        const res = await fetch(`${API_BASE_URL}/task-status`);
        if (!res.ok) {
          throw new Error("Error fetching statuses");
        }
        statuses = await res.json();
        statuses = statuses.slice().sort((a, b) => a.sequence - b.sequence);
      } catch (error) {
        console.error("Error fetching statuses", error);
      }
    }
  
    async function deleteColumn(statusId: number) {
      try {
        const response = await fetch(`${API_BASE_URL}/task-status/${statusId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error deleting status");
        }
        statuses = statuses.filter((status) => status.id !== statusId);
      } catch (error) {
        console.error("Impossible to delete column", error);
      }
    }
  
    async function addColumn() {
      try {
        const response = await fetch(`${API_BASE_URL}/task-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: " ", // Nom par défaut, à éditer par l'utilisateur
            is_new: false,
            is_close: false,
          }),
        });
        if (!response.ok) {
          throw new Error("Error adding status");
        }
        newStatus = await response.json();
        // Active le mode édition pour le nouveau statut
        newStatus.isEditing = true;
        statuses = [...statuses, newStatus];
        return newStatus;
      } catch (error) {
        console.error("Impossible to add column", error);
      }
    }
  
    onMount(fetchStatus);
  </script>
  
  <!-- Kanban Board -->
  <div class="kanban-board grid grid-cols-3 gap-4 p-4">
    {#each statuses as status (status.id)}
      <TaskColumn
        {status}
        tasks={tasks.filter((task: Task) => task.statusId === status.id)}
        {handleDrop}
        {deleteTask}
        {deleteColumn}
        {updateColumn}
        on:addColumn={addColumn}
        on:editTask={(event) => {
          selectedTask = event.detail;
        }}
        bind:isEditing={status.isEditing}
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