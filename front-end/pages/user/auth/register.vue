<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">

    <FormsCard>
      <h1 class="mb-8 text-4xl font-bold text-center text-gray-800">New Account</h1>


      <FormsInput class="my-1" label="Full name" type="text" placeholder="Enter your full name" />
      <FormsInput class="my-1" label="Email" type="email" placeholder="Enter your email" />
      <FormsInput class="my-1" label="Password" type="password" placeholder="Enter your password" />
      <FormsInput class="my-1" label="Phone number" type="text" placeholder="Enter your phone number" />
      <FormsButton class="my-4" color="primary">Register</FormsButton>

      <!-- Additional Links -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>
          Do you have an account?
          <NuxtLink to="/user/auth/login" class="text-blue-500 hover:text-blue-700 font-medium">Login</NuxtLink>
        </p>
      </div>
    </FormsCard>


  </div>
</template>

<script lang="ts" setup>
// You can add any necessary logic or imports here
</script>
