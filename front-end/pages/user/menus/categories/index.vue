<template>
  <div class="container mx-auto">

    <div class="grid justify-items-center gap-7 p-10 
              sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

      <div v-for="i in 10" class="flex justify-center items-center rounded-xl h-14 w-full
       transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer text-white bg-orange-400">
        <span class="text-4xl font-bold md:text-2xl lg:text-3xl">Snaks</span>
      </div>


    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>