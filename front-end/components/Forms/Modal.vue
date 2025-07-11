<template>
  <Dialog :open="isOpen" class="relative z-50">
    <!-- Backdrop with blur effect -->
    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

    <!-- Full-screen container to center the panel -->
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <!-- The actual dialog panel -->
      <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all animate-fade-in-up">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div class="flex items-center justify-between">
            <DialogTitle class="text-xl font-bold text-white">
              {{ props.title }}
            </DialogTitle>
            <button 
              @click="$emit('close', false)"
              class="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <i class="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-6 py-6">
          <DialogDescription>
            <slot />
          </DialogDescription>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, DialogTitle, DialogPanel, DialogDescription } from '@headlessui/vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Modal'
  }
})

const emit = defineEmits(['close'])

const isOpen = ref(true)
</script>