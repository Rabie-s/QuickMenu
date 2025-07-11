<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <i class="fas fa-utensils text-white text-xl"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ data?.[0]?.name || 'Menu' }}</h1>
              <p class="text-gray-600">Digital Menu</p>
            </div>
          </div>
          
          <!-- QR Code Button -->
          <button class="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <i class="fas fa-qrcode text-gray-600"></i>
            <span class="text-sm font-medium text-gray-700">QR Code</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="max-w-4xl mx-auto px-4 py-8">
      <div class="animate-pulse">
        <!-- Tab skeleton -->
        <div class="flex space-x-2 mb-8">
          <div class="h-12 bg-gray-200 rounded-lg w-24"></div>
          <div class="h-12 bg-gray-200 rounded-lg w-32"></div>
          <div class="h-12 bg-gray-200 rounded-lg w-28"></div>
        </div>
        
        <!-- Menu items skeleton -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="i in 4" :key="i" class="h-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 py-20 text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
      </div>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Menu Not Found</h2>
      <p class="text-gray-600">The menu you're looking for doesn't exist or has been removed.</p>
    </div>

    <!-- Menu Content -->
    <div v-else-if="data?.[0]" class="max-w-4xl mx-auto px-4 py-8">
      <TabGroup as="div">
        <!-- Category Tabs -->
        <TabList as="div" class="flex space-x-2 mb-8 overflow-x-auto pb-2">
          <Tab 
            v-for="category in data[0].categories" 
            :key="category.id"
            v-slot="{ selected }"
            as="template"
          >
            <button
              :class="[
                'px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap',
                selected 
                  ? 'tab-active' 
                  : 'tab-inactive'
              ]"
            >
              <i class="fas fa-utensils mr-2"></i>
              {{ category.name }}
            </button>
          </Tab>
        </TabList>

        <!-- Category Content -->
        <TabPanels as="div">
          <TabPanel 
            v-for="category in data[0].categories" 
            :key="category.id" 
            as="div"
            class="focus:outline-none"
          >
            <!-- Category Header -->
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ category.name }}</h2>
              <p class="text-gray-600">{{ category.menuItems?.length || 0 }} items available</p>
            </div>

            <!-- Menu Items -->
            <div v-if="category.menuItems?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="item in category.menuItems" 
                :key="item.id"
                class="menu-item-card rounded-2xl p-6 group"
              >
                <!-- Item Header -->
                <div class="flex justify-between items-start mb-3">
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {{ item.name }}
                    </h3>
                    <p class="text-gray-600 text-sm leading-relaxed">
                      {{ item.description || 'No description available' }}
                    </p>
                  </div>
                  
                  <!-- Availability Badge -->
                  <div v-if="item.is_available" class="ml-4">
                    <span class="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      <div class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                      Available
                    </span>
                  </div>
                  <div v-else class="ml-4">
                    <span class="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      <div class="w-1.5 h-1.5 bg-red-400 rounded-full mr-1"></div>
                      Unavailable
                    </span>
                  </div>
                </div>

                <!-- Price and Actions -->
                <div class="flex items-center justify-between mt-4">
                  <div class="price-badge">
                    {{ item.price }} JD
                  </div>
                  
                  <button 
                    v-if="item.is_available"
                    class="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm font-medium"
                  >
                    <i class="fas fa-heart text-xs"></i>
                    <span>Like</span>
                  </button>
                </div>

                <!-- Item Image Placeholder -->
                <div v-if="item.image" class="mt-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-image text-gray-400 text-2xl"></i>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="empty-state">
              <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-utensils text-gray-400 text-2xl"></i>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">No items in this category</h3>
              <p class="text-gray-600">This category doesn't have any menu items yet.</p>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>

    <!-- Empty Menu State -->
    <div v-else class="max-w-4xl mx-auto px-4 py-20 text-center">
      <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-utensils text-gray-400 text-2xl"></i>
      </div>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Menu is Empty</h2>
      <p class="text-gray-600">This menu doesn't have any categories or items yet.</p>
    </div>

    <!-- Floating Action Button -->
    <button class="fab">
      <i class="fas fa-share-alt"></i>
    </button>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

definePageMeta({
  layout: false
})

const { menuId } = useRoute().params
const { data, pending, error } = await useFetch(`http://localhost:3333/public/menu/${menuId}`)
</script>