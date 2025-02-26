<script lang="ts">
    let isOpen = true;
    function toggleSidebar() {
        isOpen = !isOpen;
    }

    let menuItems = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Calendar", link: "/calendar" },
        { name: "Task", link: "/tasks" },
        { name: "Settings", link: "/settings" },
    ];
</script>

<div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
      class={`bg-blue-600 text-white font-bold p-4 transition-all duration-300 ease-in-out shadow-lg ${isOpen ? "w-64" : "w-20"} flex flex-col`}
    >
      <button
        on:click={toggleSidebar}
        class="mb-6 p-2 w-full text-center bg-blue-500 hover:bg-blue-400 rounded"
      >
        {#if isOpen}
          ➖ 
        {:else}
          ➕
        {/if}
      </button>
  
      <nav class="flex-1 space-y-3">
        {#each menuItems as item}
          <a
            href={item.link}
            class="block py-3 px-4 rounded-lg hover:bg-blue-500 text-sm text-white transition-all duration-200"
          >
            {#if isOpen}
              {item.name}
            {:else}
              <span class="text-lg"></span>
            {/if}
          </a>
        {/each}
      </nav>
  
      <!-- Bouton Logout -->
      <button
        on:click={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full mt-4"
      >
        {#if isOpen} Logout {:else} {/if}
      </button>
    </div>
  
    <!-- Contenu principal -->
    <div class="flex-1 p-6 overflow-auto">
      <slot />
    </div>
  </div>