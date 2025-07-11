<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Menu Categories</h1>
        <p class="text-gray-600 mt-2">Organize your menu items into categories</p>
      </div>
      
      <FormsButton @click="open = true" size="lg" class="mt-4 sm:mt-0">
        <i class="fas fa-plus mr-2"></i>
        Add Category
      </FormsButton>
    </div>

    <!-- Create Category Modal -->
    <FormsModal v-if="open" title="Create New Category" @close="open = false">
      <form @submit.prevent="handleFormSubmit" class="space-y-6">
        <FormsInput 
          v-model="formData.name" 
          label="Category Name" 
          placeholder="e.g., Appetizers, Main Courses, Desserts"
          icon="fas fa-list"
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
            Create Category
          </FormsButton>
        </div>
      </form>
    </FormsModal>

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="spinner mx-auto mb-4"></div>
        <p class="text-gray-600">Loading categories...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!categories || categories.length === 0" class="text-center py-20">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="fas fa-list text-gray-400 text-3xl"></i>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No categories yet</h3>
      <p class="text-gray-600 mb-6 max-w-md mx-auto">
        Start organizing your menu by creating categories like "Appetizers", "Main Courses", etc.
      </p>
      <FormsButton @click="open = true" size="lg">
        <i class="fas fa-plus mr-2"></i>
        Create Your First Category
      </FormsButton>
    </div>

    <!-- Categories Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <CategoryCard 
        v-for="category in categories" 
        :key="category.id"
        :name="category.name" 
        :link="`/user/menus/${menuId}/categories/${category.id}/menu-items`"
        class="animate-fade-in-up"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <FormsModal v-if="categoryToDelete" title="Delete Category" @close="categoryToDelete = null">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-trash text-red-600 text-2xl"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Delete "{{ categoryToDelete.name }}"?</h3>
        <p class="text-gray-600 mb-6">
          This action cannot be undone. All menu items in this category will be permanently deleted.
        </p>
        
        <div class="flex justify-center space-x-3">
          <FormsButton 
            variant="outline" 
            @click="categoryToDelete = null"
          >
            Cancel
          </FormsButton>
          <FormsButton 
            color="danger" 
            @click="deleteCategory"
            :loading="isDeleting"
          >
            <i class="fas fa-trash mr-2"></i>
            Delete Category
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
const categoryToDelete = ref(null)
const { menuId } = useRoute().params

const formData = ref({
  name: ''
})

const { data: categories, status, refresh } = await useApiFetch(`user/v1/menus/${menuId}/categories`, { 
  method: 'GET', 
  lazy: true 
})

async function handleFormSubmit() {
  if (isCreating.value) return
  
  try {
    isCreating.value = true
    
    await Fetch(`user/v1/menus/${menuId}/categories`, {
      method: 'POST',
      body: { name: formData.value.name }
    })

    await myToastify('Category created successfully! 🎉', 'success')
    formData.value.name = ''
    open.value = false
    await refresh()
  } catch (error: any) {
    await myToastify('Failed to create category. Please try again.', 'error')
  } finally {
    isCreating.value = false
  }
}

function confirmDelete(category) {
  categoryToDelete.value = category
}

async function deleteCategory() {
  if (isDeleting.value || !categoryToDelete.value) return
  
  try {
    isDeleting.value = true
    
    await Fetch(`user/v1/menus/${menuId}/categories/${categoryToDelete.value.id}`, {
      method: 'DELETE',
    })
    
    await myToastify('Category deleted successfully', 'success')
    categoryToDelete.value = null
    await refresh()
  } catch (error) {
    await myToastify('Failed to delete category. Please try again.', 'error')
  } finally {
    isDeleting.value = false
  }
}
</script>