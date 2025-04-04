<template>
    <NavBar/>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">


    <FormsCard>
      <h1 class="mb-8 text-4xl font-bold text-center text-gray-800">New Account</h1>

      <ul class="bg-red-600 p-2 rounded-xl my-3" v-if="errors.length">
        <li class="text-white text-sm font-bold" v-for="error in errors">{{ error.message }}</li>
      </ul>
  
      <form @submit.prevent="handleFormSubmit" action="">
        <FormsInput v-model="formData.fullName" class="my-1" label="Full name" type="text"
          placeholder="Enter your full name" />
        <FormsInput v-model="formData.email" class="my-1" label="Email" type="email" placeholder="Enter your email" />
        <FormsInput v-model="formData.password" class="my-1" label="Password" type="password"
          placeholder="Enter your password" />
        <FormsInput v-model="formData.phoneNumber" class="my-1" label="Phone number" type="number" min="8"
          placeholder="Enter your phone number" />
        <FormsButton type="submit" class="my-4" color="primary">Register</FormsButton>

        <div class="mt-6 text-center text-sm text-gray-600">
          <p>
            Do you have an account?
            <NuxtLink to="/user/auth/login" class="text-blue-500 hover:text-blue-700 font-medium">Login</NuxtLink>
          </p>
        </div>
      </form>
    </FormsCard>



  </div>
</template>

<script lang="ts" setup>

const errors = ref<string[]>([])
const formData = ref({
  fullName: '',
  email: '',
  password: '',
  phoneNumber: ''

})

async function handleFormSubmit() {

  try {
    errors.value = []
    const res = await Fetch('user/v1/register', {
    method: 'POST',
    body: {
      ...formData.value
    },
  })

  navigateTo('/user/auth/login')

  } catch (error:any) {
    errors.value.push(...error?.data.errors)
    
  }

  
}
</script>
