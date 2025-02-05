<script lang="ts">
  import '../../app.css';
  let email = '';
  let password = '';
  let errorMessage = '';

  async function register() {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Compte créé avec succès !');
        window.location.href = '/login';
      } else {
        const data = await response.json();
        errorMessage = data.message || 'Erreur lors de la création du compte.';
      }
    } catch (error) {
      errorMessage = 'Une erreur réseau est survenue.';
      console.error('Erreur lors de l’inscription :', error);
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded shadow-md w-96">
    <h1 class="text-2xl font-bold mb-4 text-center">Créer un compte</h1>

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
      on:click={register}
      class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      S'inscrire
    </button>

    {#if errorMessage}
      <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
    {/if}

    <a href="/login" class="text-blue-500 text-sm block text-center mt-4 hover:underline">
      Se connecter
    </a>
  </div>
</div>
