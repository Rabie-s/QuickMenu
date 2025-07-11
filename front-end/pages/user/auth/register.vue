<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
    <NavBar />
    
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <FormsCard variant="glass" class="backdrop-blur-xl">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-user-plus text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p class="text-gray-600">Join QuickMenu and start creating amazing menus</p>
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

          <!-- Registration Form -->
          <form @submit.prevent="handleFormSubmit" class="space-y-6">
            <FormsInput 
              v-model="formData.fullName" 
              label="Full Name" 
              placeholder="Enter your full name" 
              icon="fas fa-user"
              required
            />
            
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
              placeholder="Create a strong password"
              icon="fas fa-lock"
              helper-text="Must be at least 8 characters long"
              required
            />
            
            <FormsInput 
              v-model="formData.phoneNumber" 
              label="Phone Number" 
              type="tel"
              placeholder="Enter your phone number" 
              icon="fas fa-phone"
              required
            />

            <!-- Terms and Conditions -->
            <div class="flex items-start">
              <input 
                id="terms" 
                type="checkbox" 
                v-model="acceptTerms"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                required
              >
              <label for="terms" class="ml-3 text-sm text-gray-600">
                I agree to the 
                <NuxtLink to="#" class="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</NuxtLink>
                and 
                <NuxtLink to="#" class="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</NuxtLink>
              </label>
            </div>

            <FormsButton 
              type="submit" 
              color="secondary"
              size="lg" 
              class="w-full"
              :loading="isLoading"
            >
              <i class="fas fa-user-plus mr-2"></i>
              Create Account
            </FormsButton>
          </form>

          <!-- Divider -->
          <div class="my-8 flex items-center">
            <div class="flex-1 border-t border-gray-200"></div>
            <span class="px-4 text-sm text-gray-500 bg-white">Or sign up with</span>
            <div class="flex-1 border-t border-gray-200"></div>
          </div>

          <!-- Social Registration -->
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

          <!-- Login Link -->
          <div class="mt-8 text-center">
            <p class="text-gray-600">
              Already have an account?
              <NuxtLink to="/user/auth/login" class="text-blue-600 hover:text-blue-700 font-semibold ml-1">
                Sign in here
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

const errors = ref<any[]>([])
const isLoading = ref(false)
const acceptTerms = ref(false)

const formData = ref({
  fullName: '',
  email: '',
  password: '',
  phoneNumber: ''
})

async function handleFormSubmit() {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    errors.value = []
    
    const res = await Fetch('user/v1/register', {
      method: 'POST',
      body: { ...formData.value },
    })

    await myToastify('Account created successfully! 🎉', 'success')
    navigateTo('/user/auth/login')

  } catch (error: any) {
    console.error('Registration error:', error)
    if (error?.data?.errors) {
      errors.value = error.data.errors
    } else {
      await myToastify('Registration failed. Please try again.', 'error')
    }
  } finally {
    isLoading.value = false
  }
}
</script>