<template>
  <nav class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg sticky top-0 z-40 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <i class="fas fa-utensils text-white text-lg"></i>
          </div>
          <h1 class="font-bold text-white text-xl tracking-tight">QuickMenu</h1>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <ul class="flex items-center space-x-6">
            <li>
              <NuxtLink to="/" class="text-white/90 hover:text-white font-medium transition-colors duration-200 flex items-center space-x-2">
                <i class="fas fa-home text-sm"></i>
                <span>Home</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="#" class="text-white/90 hover:text-white font-medium transition-colors duration-200 flex items-center space-x-2">
                <i class="fas fa-info-circle text-sm"></i>
                <span>About</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="#" class="text-white/90 hover:text-white font-medium transition-colors duration-200 flex items-center space-x-2">
                <i class="fas fa-envelope text-sm"></i>
                <span>Contact</span>
              </NuxtLink>
            </li>
          </ul>

          <!-- Auth Buttons -->
          <div v-if="!userAuthStore.isAuth" class="flex items-center space-x-3">
            <NuxtLink to="/user/auth/login">
              <FormsButton color="white" variant="outline" size="sm">
                <i class="fas fa-sign-in-alt mr-2"></i>
                Login
              </FormsButton>
            </NuxtLink>
            <NuxtLink to="/user/auth/register">
              <FormsButton color="white" size="sm">
                <i class="fas fa-user-plus mr-2"></i>
                Sign Up
              </FormsButton>
            </NuxtLink>
          </div>

          <!-- User Menu -->
          <div v-else class="flex items-center space-x-3">
            <div class="flex items-center space-x-3 text-white">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i class="fas fa-user text-sm"></i>
              </div>
              <span class="font-medium">{{ userAuthStore.user?.fullName || 'User' }}</span>
            </div>
            <FormsButton @click="logout" color="white" variant="outline" size="sm">
              <i class="fas fa-sign-out-alt mr-2"></i>
              Logout
            </FormsButton>
          </div>
        </div>

        <!-- Mobile menu button -->
        <button @click="toggleNav = !toggleNav" class="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
          <i :class="toggleNav ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="toggleNav" class="lg:hidden py-4 border-t border-white/20 animate-fade-in-up">
        <div class="space-y-4">
          <!-- Mobile Links -->
          <div class="space-y-2">
            <NuxtLink to="/" class="block text-white/90 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
              <i class="fas fa-home mr-3"></i>Home
            </NuxtLink>
            <NuxtLink to="#" class="block text-white/90 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
              <i class="fas fa-info-circle mr-3"></i>About
            </NuxtLink>
            <NuxtLink to="#" class="block text-white/90 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
              <i class="fas fa-envelope mr-3"></i>Contact
            </NuxtLink>
          </div>

          <!-- Mobile Auth Buttons -->
          <div v-if="!userAuthStore.isAuth" class="flex flex-col space-y-2 pt-4 border-t border-white/20">
            <NuxtLink to="/user/auth/login">
              <FormsButton color="white" variant="outline" class="w-full">
                <i class="fas fa-sign-in-alt mr-2"></i>
                Login
              </FormsButton>
            </NuxtLink>
            <NuxtLink to="/user/auth/register">
              <FormsButton color="white" class="w-full">
                <i class="fas fa-user-plus mr-2"></i>
                Sign Up
              </FormsButton>
            </NuxtLink>
          </div>

          <!-- Mobile User Menu -->
          <div v-else class="pt-4 border-t border-white/20">
            <div class="flex items-center space-x-3 text-white mb-4 px-4">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i class="fas fa-user"></i>
              </div>
              <span class="font-medium">{{ userAuthStore.user?.fullName || 'User' }}</span>
            </div>
            <FormsButton @click="logout" color="white" variant="outline" class="w-full">
              <i class="fas fa-sign-out-alt mr-2"></i>
              Logout
            </FormsButton>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const userAuthStore = useUserAuthStore()
const toggleNav = ref(false)

async function logout() {
  try {
    await userAuthStore.logout()
    await myToastify('Goodbye! 👋', 'success')
    navigateTo('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>