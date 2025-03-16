<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <!-- NavBar at the top -->
    <NavBar />

    <div class="flex flex-1">
      <!-- SideNav on the left -->
      <SideNav />

      <!-- Main content area -->
      <main class="flex-1 p-4 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>


