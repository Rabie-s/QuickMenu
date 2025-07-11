<template>
  <div v-bind="$attrs" class="group">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 card-hover">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      
      <!-- Content -->
      <NuxtLink :to="props.link" class="relative block h-56 flex items-center justify-center p-6">
        <div class="text-center">
          <!-- Menu Icon -->
          <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <i class="fas fa-utensils text-white text-2xl"></i>
          </div>
          
          <!-- Menu Name -->
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
            {{ props.name }}
          </h3>
          
          <!-- Subtitle -->
          <p class="text-white/80 text-sm font-medium">
            Click to manage
          </p>
        </div>
      </NuxtLink>

      <!-- Action Buttons -->
      <div class="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <!-- QR Code Button -->
        <button class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <i class="fas fa-qrcode text-sm"></i>
        </button>
        
        <!-- Delete Button -->
        <button 
          @click.stop="$emit('destroy')" 
          class="w-10 h-10 bg-red-500/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-red-600 transition-colors"
        >
          <i class="fas fa-trash text-sm"></i>
        </button>
      </div>

      <!-- Status Indicator -->
      <div class="absolute bottom-4 left-4">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-white/80 text-xs font-medium">Active</span>
        </div>
      </div>
    </div>
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
  },
})

defineEmits(['destroy'])
</script>