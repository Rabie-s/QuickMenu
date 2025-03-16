<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">

    <FormsCard>
      <h1 class="mb-8 text-4xl font-bold text-center text-gray-800">Welcome Back</h1>


      <FormsInput class="my-1" label="Email" placeholder="Enter your email" />


      <FormsInput class="my-1" label="Password" placeholder="Enter your password" type="password" />


      <FormsButton class="my-4" color="primary">Login</FormsButton>

      <div class="flex items-center my-6">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-sm text-gray-500">OR</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <div class="flex justify-center space-x-4">
        <button class="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-300">
          <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" class="w-6 h-6" />
        </button>
        <button class="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-300">
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" class="w-6 h-6" />
        </button>
        <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
          <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" class="w-6 h-6" />
        </button>
      </div>

      <div class="mt-6 text-center text-sm text-gray-600">
        <p>
          Don't have an account?
          <NuxtLink to="/user/auth/register" class="text-blue-500 hover:text-blue-700 font-medium">Sign Up</NuxtLink>
        </p>
        <p class="mt-2">
          <NuxtLink class="text-blue-500 hover:text-blue-700 font-medium">Forgot Password?</NuxtLink>
        </p>
      </div>
    </FormsCard>


  </div>
</template>

<script lang="ts" setup>
// You can add any necessary logic or imports here
</script>
