<template>
  <nav class="flex relative">
    <!-- Overlay for mobile -->
    <div 
      v-show="toggleNav && isMobile" 
      @click="toggleNav = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
    ></div>

    <!-- Side Navigation -->
    <div 
      :class="[
        'fixed lg:relative inset-y-0 left-0 z-30 w-72 bg-gradient-to-b from-blue-600 to-blue-800 shadow-2xl transform transition-transform duration-300 ease-in-out',
        toggleNav ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Header -->
      <div class="p-6 border-b border-white/20">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <i class="fas fa-tachometer-alt text-white text-lg"></i>
            </div>
            <h1 class="text-xl font-bold text-white">Dashboard</h1>
          </div>
          <button 
            @click="toggleNav = false"
            class="lg:hidden text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="p-4 space-y-2">
        <!-- Home -->
        <NuxtLink to="/user/menus/" class="group">
          <div class="flex items-center space-x-3 p-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 group-hover:translate-x-1">
            <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <i class="fas fa-home text-lg"></i>
            </div>
            <span class="font-medium">Home</span>
          </div>
        </NuxtLink>

        <!-- My Menus -->
        <NuxtLink to="/user/menus/" class="group">
          <div class="flex items-center space-x-3 p-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 group-hover:translate-x-1">
            <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <i class="fas fa-utensils text-lg"></i>
            </div>
            <span class="font-medium">My Menus</span>
          </div>
        </NuxtLink>

        <!-- Analytics -->
        <div class="group cursor-pointer">
          <div class="flex items-center space-x-3 p-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 group-hover:translate-x-1">
            <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <i class="fas fa-chart-bar text-lg"></i>
            </div>
            <span class="font-medium">Analytics</span>
            <span class="ml-auto text-xs bg-amber-500 text-white px-2 py-1 rounded-full">Soon</span>
          </div>
        </div>

        <!-- Settings -->
        <div class="group cursor-pointer">
          <div class="flex items-center space-x-3 p-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 group-hover:translate-x-1">
            <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <i class="fas fa-cog text-lg"></i>
            </div>
            <span class="font-medium">Settings</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <div class="text-center text-white/60 text-sm">
          <p>QuickMenu v1.0</p>
          <p class="text-xs mt-1">© 2025 All rights reserved</p>
        </div>
      </div>
    </div>

    <!-- Toggle Button for Mobile -->
    <button 
      @click="toggleNav = !toggleNav"
      class="fixed top-20 left-4 z-40 lg:hidden bg-blue-600 text-white p-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
    >
      <i :class="toggleNav ? 'fas fa-times' : 'fas fa-bars'" class="text-lg"></i>
    </button>
  </nav>
</template>

<script setup lang="ts">
const toggleNav = ref(false)
const isMobile = ref(false)

onMounted(() => {
  // Check if mobile on mount
  isMobile.value = window.innerWidth < 1024
  
  // Listen for window resize
  const handleResize = () => {
    isMobile.value = window.innerWidth < 1024
    if (!isMobile.value) {
      toggleNav.value = false
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>