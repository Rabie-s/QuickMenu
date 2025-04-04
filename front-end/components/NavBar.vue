<template>
  <nav class="flex flex-col justify-center bg-blue-600 px-5 min-h-[46px] relative">
    <!-- Toggle Button for Mobile -->
    <span @click="toggleNav = !toggleNav" class="text-2xl text-white absolute right-5 cursor-pointer lg:hidden">
      {{ toggleNav ? '×' : '☰' }}
    </span>

    <!-- Navigation Content -->
    <div :class="{ 'hidden lg:flex': !toggleNav, 'flex': toggleNav }"
      class="flex-col lg:flex-row items-center justify-between w-full lg:w-auto lg:flex">
      <!-- Logo -->
      <h1 class="font-extrabold text-white text-[20px]">QuickMenu</h1>

      <!-- Navigation Links -->
      <div class="m-5 lg:m-0">
        <ul class="text-white flex flex-col lg:flex-row gap-x-5">
          <li>
            <NuxtLink to="/" class="font-medium text-[16px] cursor-pointer hover:text-gray-300">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="font-medium text-[16px] cursor-pointer hover:text-gray-300">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="font-medium text-[16px] cursor-pointer hover:text-gray-300">Contact us</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Buttons -->
      <div v-if="userAuthStore.isAuth === false" class="flex gap-2 m-5 lg:m-0">
        <NuxtLink to="/user/auth/login">
          <FormsButton color="white">Login</FormsButton>
        </NuxtLink>

        <NuxtLink to="/user/auth/register">
          <FormsButton color="white">Sign Up</FormsButton>
        </NuxtLink>

      </div>

      <!-- Buttons -->
      <div v-if="userAuthStore.isAuth === true" class="flex gap-2 m-5 lg:m-0">
        
          <FormsButton @click="logout" color="white">Logout</FormsButton>
        

      </div>

    </div>
  </nav>
</template>

<script lang="ts" setup>
const userAuthStore = useUserAuthStore()

const toggleNav = ref(false);

async function logout() {
  try {
    await userAuthStore.logout()
  //TODO fix toastfy message duration 
    await myToastify('GoodBye!','success')
    navigateTo('/')
    
  } catch (error) {
    
  }
  
}
</script>