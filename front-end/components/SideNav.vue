<template>
  <nav class="z-30 flex">
    <!-- Side Navigation -->
    <div v-show="toggleNav" class="w-[288px] bg-blue-600">
      <!-- Logo -->
      <div class="p-4 flex justify-between items-center">
        <h1 class="w-full m-5 text-[20px] text-center text-white uppercase font-bold">Dashboard</h1>
      </div>
      <!-- End Logo -->

      <!-- Menu -->
      <div class="mt-2 p-1">
        <NuxtLink to="/user/menus/">
          <div
            class="flex text-white items-center text-[16px] gap-x-2 p-2 rounded-lg cursor-pointer hover:bg-blue-500">
            <i class="fa-solid fa-house text-2xl"></i>
            <h4>Home</h4>
          </div>
        </NuxtLink>
      </div>
      <!-- End Menu -->

      <!-- Menu -->
      <div class="mt-2 p-1">
        <NuxtLink to="/user/menus/">
          <div
            class="flex text-white items-center text-[16px] gap-x-2 p-2 rounded-lg cursor-pointer hover:bg-blue-500">
            <i class="fa-solid fa-square-minus text-2xl"></i>
            <h4>My menus</h4>
          </div>
        </NuxtLink>
      </div>
      <!-- End Menu -->

            <!-- Menu -->
            <div class="mt-2 p-1">
        <NuxtLink to="/user/menus/tt">
          <div
            class="flex text-white items-center text-[16px] gap-x-2 p-2 rounded-lg cursor-pointer hover:bg-blue-500">
            <i class="fa-solid fa-square-minus text-2xl"></i>
            <h4>Test</h4>
          </div>
        </NuxtLink>
      </div>
      <!-- End Menu -->


    </div>

    

    <!-- Toggle Button -->
     <span class=" absolute lg:hidden">
      <i @click="toggleNav = !toggleNav" class="fa-solid text-2xl cursor-pointer text-black m-4"
      :class="toggleNav ? 'fa-xmark' : 'fa-bars'"></i>
     </span>

  </nav>
</template>

<script setup lang="ts">
const toggleNav = ref(true);
</script>

<style>
/* Add custom styles if needed */
</style>