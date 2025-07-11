<template>
  <div class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover">
    <!-- Background Image -->
    <div class="h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <!-- Menu Name -->
      <div class="absolute inset-0 flex items-center justify-center">
        <h3 class="text-3xl font-bold text-white text-center px-4 drop-shadow-lg">
          {{ name }}
        </h3>
      </div>

      <!-- Actions -->
      <div class="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          @click.prevent="$emit('destroy')"
          class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
        >
          <i class="fas fa-trash text-sm"></i>
        </button>
      </div>

      <!-- Status Badge -->
      <div class="absolute bottom-4 left-4">
        <span class="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
          Active
        </span>
      </div>
    </div>

    <!-- Card Content -->
    <div class="p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2 text-gray-500 text-sm">
          <i class="fas fa-utensils"></i>
          <span>Restaurant Menu</span>
        </div>
        <div class="flex items-center space-x-1 text-gray-400">
          <i class="fas fa-eye text-xs"></i>
          <span class="text-xs">0 views</span>
        </div>
      </div>

      <!-- Action Button -->
      <NuxtLink :to="link" class="block mt-4">
        <FormsButton class="w-full" size="sm">
          <i class="fas fa-edit mr-2"></i>
          Manage Menu
        </FormsButton>
      </NuxtLink>
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