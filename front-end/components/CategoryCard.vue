<template>
  <div class="group relative">
    <NuxtLink :to="link" class="block">
      <div class="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
          <div class="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <i class="fas fa-list text-2xl opacity-80"></i>
            <div class="w-2 h-2 bg-white rounded-full opacity-60"></div>
          </div>
          
          <h3 class="text-xl font-bold mb-2">{{ name }}</h3>
          <p class="text-white/80 text-sm">Manage category items</p>
          
          <!-- Arrow Icon -->
          <div class="mt-4 flex justify-end">
            <i class="fas fa-arrow-right text-lg group-hover:translate-x-1 transition-transform"></i>
          </div>
        </div>

        <!-- Shine Effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
</script>