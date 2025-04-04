<template>
  <div class="container mx-auto">

    <div class="flex justify-end my-5">
      <FormsButton @click="open = true" class="px-2">Create new item</FormsButton>

      <FormsModal @close="(n) => open = n" v-if="open">
        <div ref="modal" class="flex flex-col">
          <form @submit.prevent="handleFormSubmit">
            <FormsInput v-model="formData.name" label="Title" />
            <FormsInput v-model="formData.price" label="Price" />
            <FormsInput v-model="formData.description" label="description" />
            <FormsInput v-model="formData.image" label="Image" />
            <FormsButton class="mt-2" color="secondary">Save</FormsButton>
          </form>
        </div>
      </FormsModal>

    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-green-500 text-white">
          <tr>
            <th class="px-6 py-3 border border-gray-200">Name</th>
            <th class="px-6 py-3 border border-gray-200">Price</th>
            <th class="px-6 py-3 border border-gray-200">Is available</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="menuItem in menuItems" class="bg-gray-50 hover:bg-gray-100 transition-colors">
            <td class="px-6 py-4 border border-gray-200 text-center">{{ menuItem.name }}</td>
            <td class="px-6 py-4 border border-gray-200 text-center">{{ menuItem.price }}</td>
            <td class="px-6 py-4 border border-gray-200 text-center text-green-600">{{ menuItem.isAvailable ? 'True'
              : 'False' }}</td>
          </tr>
        </tbody>
      </table>
    </div>



  </div>
</template>

<script lang="ts" setup>
const open = ref(false)
const { menuId, categoryId } = useRoute().params

const formData = ref({
  name: '',
  price: '',
  description: '',
  image: ''

})

const { data: menuItems, status, refresh } = await useApiFetch(`user/v1/menus/${menuId}/categories/${categoryId}/menu-items`,
  { method: 'GET', lazy: true })


async function handleFormSubmit() {
  //http://localhost:3333/user/v1/menus/40/categories/16/menu-items
  try {
    await Fetch(`user/v1/menus/${menuId}/categories/${categoryId}/menu-items`, {
      method: 'POST',
      body: {
        name: formData.value.name,
        price: formData.value.price,
        description: formData.value.description,
        image: formData.value.image
      }
    })

    myToastify('Menu item created successfuly', 'success')
    open.value = false
    await refresh()
  } catch (error: any) {
    console.log(error.value)
  }

}

</script>
