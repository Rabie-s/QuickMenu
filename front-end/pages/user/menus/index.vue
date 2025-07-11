<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">My Menus</h1>
        <p class="text-gray-600 mt-2">Create and manage your restaurant menus</p>
      </div>
      
      <FormsButton @click="open = true" size="lg" class="mt-4 sm:mt-0">
        <i class="fas fa-plus mr-2"></i>
        Create New Menu
      </FormsButton>
    </div>

    <!-- Create Menu Modal -->
    <FormsModal v-if="open" title="Create New Menu" @close="open = false">
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

      <form @submit.prevent="handleFormSubmit" class="space-y-6">
        <FormsInput 
          v-model="formData.name" 
          label="Menu Name" 
          placeholder="e.g., Main Menu, Breakfast Menu"
          icon="fas fa-utensils"
          required
        />
        
        <div class="flex justify-end space-x-3">
          <FormsButton 
            type="button" 
            variant="outline" 
            @click="open = false"
          >
            Cancel
          </FormsButton>
          <FormsButton 
            type="submit" 
            color="secondary"
            :loading="isCreating"
          >
            <i class="fas fa-plus mr-2"></i>
            Create Menu
          </FormsButton>
        </div>
      </form>
    </FormsModal>

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="spinner mx-auto mb-4"></div>
        <p class="text-gray-600">Loading your menus...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!menus || menus.length === 0" class="text-center py-20">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="fas fa-utensils text-gray-400 text-3xl"></i>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No menus yet</h3>
      <p class="text-gray-600 mb-6 max-w-md mx-auto">
        Get started by creating your first menu. It only takes a few minutes!
      </p>
      <FormsButton @click="open = true" size="lg">
        <i class="fas fa-plus mr-2"></i>
        Create Your First Menu
      </FormsButton>
    </div>

    <!-- Menus Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <MenuCard 
        v-for="menu in menus" 
        :key="menu.id"
        :name="menu.name" 
        :link="`/user/menus/${menu.id}/categories/`" 
        @destroy="confirmDelete(menu)"
        class="animate-fade-in-up"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <FormsModal v-if="menuToDelete" title="Delete Menu" @close="menuToDelete = null">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-trash text-red-600 text-2xl"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Delete "{{ menuToDelete.name }}"?</h3>
        <p class="text-gray-600 mb-6">
          This action cannot be undone. All categories and menu items will be permanently deleted.
        </p>
        
        <div class="flex justify-center space-x-3">
          <FormsButton 
            variant="outline" 
            @click="menuToDelete = null"
          >
            Cancel
          </FormsButton>
          <FormsButton 
            color="danger" 
            @click="deleteMenu"
            :loading="isDeleting"
          >
            <i class="fas fa-trash mr-2"></i>
            Delete Menu
          </FormsButton>
        </div>
      </div>
    </FormsModal>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'user-auth'
})

const errors = ref<any[]>([])
const open = ref(false)
const isCreating = ref(false)
const isDeleting = ref(false)
const menuToDelete = ref(null)

const formData = ref({
  name: ''
})

const { data: menus, status, refresh } = await useApiFetch('user/v1/menus', { 
  method: 'GET', 
  lazy: true 
})

async function handleFormSubmit() {
  if (isCreating.value) return
  
  try {
    isCreating.value = true
    errors.value = []
    
    await Fetch('user/v1/menus', {
      method: 'POST',
      body: { name: formData.value.name }
    })
    
    await myToastify('Menu created successfully! 🎉', 'success')
    formData.value.name = ''
    open.value = false
    await refresh()
  } catch (error: any) {
    if (error?.data?.errors) {
      errors.value = error.data.errors
    } else {
      await myToastify('Failed to create menu. Please try again.', 'error')
    }
  } finally {
    isCreating.value = false
  }
}

function confirmDelete(menu) {
  menuToDelete.value = menu
}

async function deleteMenu() {
  if (isDeleting.value || !menuToDelete.value) return
  
  try {
    isDeleting.value = true
    
    await Fetch(`user/v1/menus/${menuToDelete.value.id}`, {
      method: 'DELETE',
    })
    
    await myToastify('Menu deleted successfully', 'success')
    menuToDelete.value = null
    await refresh()
  } catch (error) {
    await myToastify('Failed to delete menu. Please try again.', 'error')
  } finally {
    isDeleting.value = false
  }
}
</script>