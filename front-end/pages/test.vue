<template>
    <div v-if="status === 'pending'">
        Loding...
    </div>
    <div v-else>
        <ul v-for="user in data">
            <li>{{ user.fullName }}</li>
        </ul>
    </div>

    <TransitionRoot
    :show="isOpen"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog @close="setIsOpen">
      <DialogPanel>
        <DialogTitle>Deactivate account</DialogTitle>
        <!-- ... -->
        <button @click="isOpen = false">Close</button>
      </DialogPanel>
    </Dialog>
  </TransitionRoot>

  <button @click="isOpen=true">open</button>


</template>
<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
    TransitionRoot
  } from '@headlessui/vue'
  const isOpen = ref(false)
  const completeButtonRef = ref(null)

function setIsOpen(value:boolean) {
  isOpen.value = value
}

function completeOrder() {
    console.log('yes')
  }



const errors = ref<string[]>([])
//const data = ref<string[]>([])
    const config = useRuntimeConfig();
    const { status, data } = await useLazyFetch(`${config.public.apiBase}/test`);



</script>