<template>
  <div class="container mx-auto">

    <div class="flex justify-end">
      <FormsButton @click="open = true" class="px-2">Create new menu</FormsButton>

      <FormsModal @close="(n) => open = n" v-if="open">
        <div ref="modal" class="flex flex-col">
          <FormsInput label="Menu name" />
          <FormsButton class="mt-2" color="secondary">Save</FormsButton>
        </div>
      </FormsModal>

    </div>


    <div class="grid justify-items-center gap-7 p-10 
              sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

      <div v-for="i in 1" class="flex items-center justify-center rounded-xl bg-cover bg-center text-white text-3xl font-extrabold shadow-lg
        h-48 w-full relative overflow-hidden cursor-pointer
         transition ease-in-out hover:-translate-y-1
          hover:scale-110 bg-[url('~/assets/images/res1.jpeg')]">

        <span class="text-4xl md:text-5xl lg:text-6xl backdrop-blur-sm bg-black/20 px-6 py-3 rounded-lg">
          AL-Reem
        </span>

      </div>

    </div>



  </div>

</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';

const open = ref(false)
const modal = ref(null)
onClickOutside(modal, () => (open.value = false))


</script>
