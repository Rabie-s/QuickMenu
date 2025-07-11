<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
    <NavBar />
    
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <FormsCard variant="glass" class="backdrop-blur-xl">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-sign-in-alt text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p class="text-gray-600">Sign in to your account to continue</p>
          </div>

          <!-- Error Messages -->
          <div v-if="errors.length" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div class="flex items-center mb-2">
              <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
              <span class="text-red-800 font-semibold">Please fix the following errors:</span>
            </div>
            <ul class="space-y-1">
              <li v-for="error in errors" :key="error.message" class="text-red-700 text-sm">
                • {{ error.message }}
              </li>
            </ul>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleFormSubmit" class="space-y-6">
            <FormsInput 
              v-model="formData.email" 
              label="Email Address" 
              type="email"
              placeholder="Enter your email" 
              icon="fas fa-envelope"
              required
            />
            
            <FormsInput 
              v-model="formData.password" 
              label="Password" 
              type="password"
              placeholder="Enter your password"
              icon="fas fa-lock"
              required
            />

            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <NuxtLink to="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </NuxtLink>
            </div>

            <FormsButton 
              type="submit" 
              size="lg" 
              class="w-full"
              :loading="isLoading"
            >
              <i class="fas fa-sign-in-alt mr-2"></i>
              Sign In
            </FormsButton>
          </form>

          <!-- Divider -->
          <div class="my-8 flex items-center">
            <div class="flex-1 border-t border-gray-200"></div>
            <span class="px-4 text-sm text-gray-500 bg-white">Or continue with</span>
            <div class="flex-1 border-t border-gray-200"></div>
          </div>

          <!-- Social Login -->
          <div class="grid grid-cols-3 gap-3">
            <button class="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
            </button>
            <button class="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <img src="https://img.icons8.com/color/24/000000/facebook-new.png" alt="Facebook" />
            </button>
            <button class="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <img src="https://img.icons8.com/ios-filled/24/000000/github.png" alt="GitHub" />
            </button>
          </div>

          <!-- Sign Up Link -->
          <div class="mt-8 text-center">
            <p class="text-gray-600">
              Don't have an account?
              <NuxtLink to="/user/auth/register" class="text-blue-600 hover:text-blue-700 font-semibold ml-1">
                Create one now
              </NuxtLink>
            </p>
          </div>
        </FormsCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})

const userAuthStore = useUserAuthStore()
const errors = ref<any[]>([])
const isLoading = ref(false)

const formData = ref({
  email: '',
  password: '',
})

async function handleFormSubmit() {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    errors.value = []
    
    await userAuthStore.login(formData.value)
    await myToastify('Welcome back! 🎉', 'success')
    navigateTo('/user/menus')
  } catch (error: any) {
    console.error('Login error:', error)
    if (error.data?.errors) {
      errors.value = error.data.errors
    } else {
      await myToastify('Login failed. Please try again.', 'error')
    }
  } finally {
    isLoading.value = false
  }
}
</script>