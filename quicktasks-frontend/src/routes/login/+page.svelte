<script lang="ts">
  import { onMount } from 'svelte';
  import KanbanBoard from '$lib/KanbanBoard.svelte';
  import '../../app.css';
  import type { TaskStatus, Task } from '$lib/types';

  let email='';
  let password='';
  let tasks: Task[];
  let errorMessage = '';
  let newTask = '';


  async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    tasks = await response.json();
  }

  onMount(fetchTasks);

  async function login() {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // ✅ Stockage du JWT
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        errorMessage = data.message || 'Erreur lors de la connexion.';
      }
    } catch (error) {
      errorMessage = 'Erreur réseau.';
    }
  }
  </script>

  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-bold mb-4 text-center">Connexion</h1>
      <input
        type="email"
        bind:value={email}
        placeholder="Email"
        class="w-full p-2 mb-3 border rounded"
      />
      <input
        type="password"
        bind:value={password}
        placeholder="Password"
        class="w-full p-2 mb-3 border rounded"
      />
      <button
        on:click={login}
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>

      {#if errorMessage}
        <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
      {/if}

      <a href="/register" class="text-blue-500 text-sm block text-center mt-4">Sign in</a>
    </div>
  </div>