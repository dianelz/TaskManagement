<script lang="ts">
  import "../../app.css";
  import { onMount } from "svelte";
  import KanbanBoard from "$lib/KanbanBoard.svelte";
  import type { Task, TaskStatus } from "$lib/types";
  import { user, setUser, clearUser, type User } from '../../stores/auth';
  import { goto } from '$app/navigation';
    import { get } from "svelte/store";

  export let deleteColumn: (statusId: number) => void;
  export let addColumn: () => void;

  let tasks: Task[] = [];
  let newTask = "";
  const API_BASE_URL = "http://localhost:3000";

  async function fetchUser() {
    const token = localStorage.getItem('token');

    if (!token) {
      goto('/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response);

      if (response.ok) {
        const data: User = await response.json();
        setUser(data);
      } else {
        clearUser();
        goto('/login');
      }
    } catch (error) {
      console.error('Erreur de récupération utilisateur:', error);
      clearUser();
      goto('/login');
    }
  }

  function logout() {
    clearUser();
    goto('/login');
  }

  onMount(fetchUser);

  async function fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }
      tasks = await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function addTask() {
    const currentUser = get(user);
    if (!newTask.trim()) return;
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask, userId: currentUser?.id }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
      }
      newTask = "";
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function handleDrop(
    taskId: number,
    newStatus: TaskStatus,
  ): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
      }
      const updatedTask = await response.json();
      tasks = tasks.map((task) =>
        task.id === taskId ? { ...task, statusId: updatedTask.statusId } : task
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function deleteTask(taskId: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error when deleting task");
      }
      tasks = tasks.filter((task) => task.id !== taskId);
    } catch (error) {
      console.error("Unable to delete task:", error);
    }
  }

  onMount(() => {
    fetchUser();
    fetchTasks();
  });
</script>
  {#if user}
    <h1 class="text-3xl font-bold text-center my-4">Task Manager</h1>

    <div class="flex justify-center mb-4">
      <input
        type="text"
        bind:value={newTask}
        placeholder="New Task"
        class="border p-2 rounded-l-md"
      />
      <button
        on:click={addTask}
        class="bg-blue-500 text-white px-4 py-2 rounded-r-md"
      >
        Add
      </button>
    </div>

    <KanbanBoard {tasks} {handleDrop} {deleteTask} />
  {/if}
