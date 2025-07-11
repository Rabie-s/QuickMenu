<template>
  <div class="group">
    <NuxtLink :to="props.link">
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 card-hover h-32">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        <!-- Content -->
        <div class="relative h-full flex items-center justify-center p-4">
          <div class="text-center">
            <!-- Category Icon -->
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-list text-white text-lg"></i>
            </div>
            
            <!-- Category Name -->
            <h3 class="text-xl md:text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
              {{ props.name }}
            </h3>
          </div>
        </div>

        <!-- Hover Effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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