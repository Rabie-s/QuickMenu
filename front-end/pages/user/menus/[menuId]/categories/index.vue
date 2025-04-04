<template>
    <div class="container mx-auto">
  
      <div class="flex justify-end">
        <FormsButton @click="open = true" class="px-2">Create new category</FormsButton>
  
        <FormsModal @close="(n) => open = n" v-if="open">
          <div ref="modal" class="flex flex-col">
            <form @submit.prevent="handleFormSubmit">
              <FormsInput v-model="formData.name" label="Category name" />
              <FormsButton class="mt-2" color="secondary">Save</FormsButton>
            </form>
          </div>
        </FormsModal>
  
      </div>
  
      <div class="grid justify-items-center gap-7 p-10 
                sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  
        <div v-if="status === 'pending'">
          Lofing...
        </div>
  
        <div v-else v-for="category in categories" class="w-full">
          <CategoryCard :name="category.name" :link="`/user/menus/${menuId}/categories/${category.id}/menu-items`" />
        </div>
  
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import CategoryCard from '~/components/CategoryCard.vue';
  const open = ref(false)
  const {menuId} = useRoute().params
  
  const formData = ref({
    name: ''
  })
  
  const { data: categories, status, refresh } = await useApiFetch(`user/v1/menus/${menuId}/categories`, { method: 'GET', lazy: true })
 
  async function handleFormSubmit() {
  
    try {
      const res = await Fetch(`user/v1/menus/${menuId}/categories`, {
        method: 'POST',
        body: {
          name: formData.value.name
        }
  
      })
  
      myToastify('Category created successfuly', 'success')
      formData.value.name = ''
      open.value = false
      await refresh()
    } catch (error: any) {
  
    }
  
  }
  </script>
  