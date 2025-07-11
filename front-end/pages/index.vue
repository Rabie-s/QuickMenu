<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <NavBar />
    
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div class="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style="animation-delay: 2s;"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Content -->
          <div class="space-y-8 animate-fade-in-up">
            <!-- Badge -->
            <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              <i class="fas fa-sparkles mr-2"></i>
              New & Improved
            </div>

            <!-- Main Heading -->
            <div class="space-y-4">
              <h1 class="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Quick
                </span>
                <span class="text-gray-900">Menu</span>
              </h1>
              <p class="text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed">
                Create stunning digital menus in minutes. Share via QR codes and let customers vote on their favorites.
              </p>
            </div>

            <!-- Features List -->
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-check text-green-600 text-sm"></i>
                </div>
                <span class="text-gray-700 font-medium">Easy drag & drop menu builder</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-check text-green-600 text-sm"></i>
                </div>
                <span class="text-gray-700 font-medium">Instant QR code generation</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-check text-green-600 text-sm"></i>
                </div>
                <span class="text-gray-700 font-medium">Customer voting & feedback</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/user/auth/register">
                <FormsButton size="lg" class="w-full sm:w-auto">
                  <i class="fas fa-rocket mr-2"></i>
                  Get Started Free
                </FormsButton>
              </NuxtLink>
              <FormsButton variant="outline" size="lg" class="w-full sm:w-auto">
                <i class="fas fa-play mr-2"></i>
                Watch Demo
              </FormsButton>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900">1K+</div>
                <div class="text-sm text-gray-600">Active Menus</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900">50K+</div>
                <div class="text-sm text-gray-600">QR Scans</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900">99%</div>
                <div class="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          <!-- Image -->
          <div class="relative animate-slide-in-right">
            <div class="relative">
              <!-- Decorative Elements -->
              <div class="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-2xl transform rotate-6 opacity-60"></div>
              <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-2xl transform -rotate-6 opacity-60"></div>
              
              <!-- Main Image -->
              <div class="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="~/assets/images/qr-image.jpg" 
                  alt="QR Code Menu Demo"
                  class="w-full h-auto"
                />
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to create amazing menus
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            From design to deployment, we've got you covered with powerful tools and beautiful templates.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-palette text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Beautiful Design</h3>
            <p class="text-gray-600">
              Choose from stunning templates or create your own unique design with our intuitive editor.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-qrcode text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">QR Code Magic</h3>
            <p class="text-gray-600">
              Generate QR codes instantly and let customers access your menu with a simple scan.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-chart-line text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Smart Analytics</h3>
            <p class="text-gray-600">
              Track customer preferences and get insights to optimize your menu performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})
</script>