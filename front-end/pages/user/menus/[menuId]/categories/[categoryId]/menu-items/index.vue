<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Menu Items</h1>
        <p class="text-gray-600 mt-2">Add and manage items in this category</p>
      </div>
      
      <FormsButton @click="open = true" size="lg" class="mt-4 sm:mt-0">
        <i class="fas fa-plus mr-2"></i>
        Add Menu Item
      </FormsButton>
    </div>

    <!-- Create Menu Item Modal -->
    <FormsModal v-if="open" title="Create New Menu Item" @close="open = false">
      <form @submit.prevent="handleFormSubmit" class="space-y-6">
        <FormsInput 
          v-model="formData.name" 
          label="Item Name" 
          placeholder="e.g., Grilled Chicken Sandwich"
          icon="fas fa-utensils"
          required
        />
        
        <FormsInput 
          v-model="formData.price" 
          label="Price (JD)" 
          type="number"
          step="0.01"
          placeholder="0.00"
          icon="fas fa-dollar-sign"
          required
        />
        
        <FormsInput 
          v-model="formData.description" 
          label="Description" 
          placeholder="Describe your menu item..."
          icon="fas fa-align-left"
        />

        <!-- File Upload -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">
            Item Image
          </label>
          <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
            <input 
              type="file" 
              ref="imageInput" 
              @change="onInputFileChange"
              accept="image/*"
              class="hidden"
            >
            <div v-if="!formData.image" @click="$refs.imageInput.click()" class="cursor-pointer">
              <i class="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-2"></i>
              <p class="text-gray-600">Click to upload image</p>
              <p class="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
            </div>
            <div v-else class="space-y-2">
              <i class="fas fa-image text-green-500 text-2xl"></i>
              <p class="text-green-600 font-medium">{{ formData.image.name }}</p>
              <button 
                type="button"
                @click="formData.image = null"
                class="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        
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
            Create Item
          </FormsButton>
        </div>
      </form>
    </FormsModal>

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="spinner mx-auto mb-4"></div>
        <p class="text-gray-600">Loading menu items...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!menuItems || menuItems.length === 0" class="text-center py-20">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="fas fa-utensils text-gray-400 text-3xl"></i>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No menu items yet</h3>
      <p class="text-gray-600 mb-6 max-w-md mx-auto">
        Start adding delicious items to this category.
      </p>
      <FormsButton @click="open = true" size="lg">
        <i class="fas fa-plus mr-2"></i>
        Add Your First Item
      </FormsButton>
    </div>

    <!-- Menu Items Table -->
    <div v-else class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-blue-600 to-blue-700">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Item Name
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Price
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="menuItem in menuItems" 
              :key="menuItem.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-utensils text-gray-400"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ menuItem.name }}</div>
                    <div class="text-sm text-gray-500">{{ menuItem.description || 'No description' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {{ menuItem.price }} JD
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    menuItem.is_available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  <div 
                    :class="[
                      'w-1.5 h-1.5 rounded-full mr-1',
                      menuItem.is_available ? 'bg-green-400' : 'bg-red-400'
                    ]"
                  ></div>
                  {{ menuItem.is_available ? 'Available' : 'Unavailable' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  @click="confirmDelete(menuItem)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                >
                  <i class="fas fa-trash mr-1"></i>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <FormsModal v-if="itemToDelete" title="Delete Menu Item" @close="itemToDelete = null">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-trash text-red-600 text-2xl"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Delete "{{ itemToDelete.name }}"?</h3>
        <p class="text-gray-600 mb-6">
          This action cannot be undone. The menu item will be permanently deleted.
        </p>
        
        <div class="flex justify-center space-x-3">
          <FormsButton 
            variant="outline" 
            @click="itemToDelete = null"
          >
            Cancel
          </FormsButton>
          <FormsButton 
            color="danger" 
            @click="deleteMenuItem"
            :loading="isDeleting"
          >
            <i class="fas fa-trash mr-2"></i>
            Delete Item
          </FormsButton>
        </div>
      </div>
    </FormsModal>
  </div>
</template>

<script lang="ts" setup>
const open = ref(false)
const isCreating = ref(false)
const isDeleting = ref(false)
const itemToDelete = ref(null)
const { menuId, categoryId } = useRoute().params

const formData = ref({
  name: '',
  price: '',
  description: '',
  image: null
})

function onInputFileChange(event) {
  formData.value.image = event.target.files[0]
}

const { data: menuItems, status, refresh } = await useApiFetch(
  `user/v1/menus/${menuId}/categories/${categoryId}/menu-items`,
  { method: 'GET', lazy: true }
)

async function handleFormSubmit() {
  if (isCreating.value) return
  
  try {
    isCreating.value = true
    
    const payload = new FormData()
    payload.append('name', formData.value.name)
    payload.append('price', formData.value.price)
    payload.append('description', formData.value.description)
    if (formData.value.image) {
      payload.append('image', formData.value.image)
    }
    
    await Fetch(`user/v1/menus/${menuId}/categories/${categoryId}/menu-items`, {
      method: 'POST',
      body: payload
    })

    await myToastify('Menu item created successfully! 🎉', 'success')
    
    // Reset form
    formData.value = {
      name: '',
      price: '',
      description: '',
      image: null
    }
    
    open.value = false
    await refresh()
  } catch (error: any) {
    await myToastify('Failed to create menu item. Please try again.', 'error')
  } finally {
    isCreating.value = false
  }
}

function confirmDelete(item) {
  itemToDelete.value = item
}

async function deleteMenuItem() {
  if (isDeleting.value || !itemToDelete.value) return
  
  try {
    isDeleting.value = true
    
    await Fetch(`user/v1/menus/${menuId}/categories/${categoryId}/menu-items/${itemToDelete.value.id}`, {
      method: 'DELETE',
    })
    
    await myToastify('Menu item deleted successfully', 'success')
    itemToDelete.value = null
    await refresh()
  } catch (error) {
    await myToastify('Failed to delete menu item. Please try again.', 'error')
  } finally {
    isDeleting.value = false
  }
}
</script>