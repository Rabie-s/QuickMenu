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
            <input type="file" ref="imageInput" @change="onInputFileChange" id="">
            <!-- <FormsInput v-model="formData.image" label="Image" /> -->
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
            <th class="px-6 py-3 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="menuItem in menuItems" class="bg-gray-50 hover:bg-gray-100 transition-colors">
            <td class="px-6 py-4 border border-gray-200 text-center">{{ menuItem.name }}</td>
            <td class="px-6 py-4 border border-gray-200 text-center">{{ menuItem.price }}</td>
            <td class="px-6 py-4 border border-gray-200 text-center text-green-600">{{ menuItem.isAvailable ? 'True'
              : 'False' }}</td>
              <td class="px-6 py-4 border border-gray-200 text-center text-green-600">
                <button class="text-red-600 cursor-pointer" @click="destroy(menuItem.id)">Delete</button>
              </td>
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
  image: null

})

function onInputFileChange(event){
formData.value.image = event.target.files[0]
}

const { data: menuItems, status, refresh } = await useApiFetch(`user/v1/menus/${menuId}/categories/${categoryId}/menu-items`,
  { method: 'GET', lazy: true })


async function handleFormSubmit() {
  const payload = new FormData()
  payload.append('name',formData.value.name);
  payload.append('price',formData.value.price);
  payload.append('description',formData.value.description);
  payload.append('image',formData.value.image);
  try {
    await Fetch(`user/v1/menus/${menuId}/categories/${categoryId}/menu-items`, {
      method: 'POST',
      body: payload
    })

    myToastify('Menu item created successfuly', 'success')
    open.value = false
    await refresh()
  } catch (error: any) {
    console.log(error.value)
  }

}

async function destroy(id) {
  const res = await Fetch(`user/v1/menus/${menuId}/categories/${categoryId}/menu-items/${id}`, {
    method: 'DELETE',
  })
  myToastify('Menu deleted successfuly', 'success')
  await refresh()
}

</script>
