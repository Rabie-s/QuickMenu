<template>
  <Dialog :open="isOpen" class="relative z-50">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- Full-screen container to center the panel -->
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <!-- The actual dialog panel -->
      <DialogPanel class="w-full md:w-1/3 max-w-sm rounded bg-white">
        <div class="p-5">
          <DialogTitle class="text-4xl font-extrabold text-center my-2">{{ props.title }}</DialogTitle>
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
    type: String
  }
})
const isOpen = ref(true)
</script>
