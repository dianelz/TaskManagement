<script lang="ts">
  import '../../app.css';
  let email = '';
  let password = '';

  async function login() {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } else {
      alert('Erreur de connexion');
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
        class="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input 
        type="password" 
        bind:value={password} 
        placeholder="Mot de passe"
        class="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button 
        on:click={login}
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Se connecter
      </button>
      <a href="/register" class="text-blue-500 text-sm block text-center mt-4 hover:underline" >Créer un compte</a>
    </div>
</div>

