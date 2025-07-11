<template>
  <div class="container mx-auto">

    <div class="flex justify-end">
      <FormsButton @click="open = true" class="px-2">Create new menu</FormsButton>

      <FormsModal v-if="open" title="Create new menu" @close="(n) => open = n">

        <ul class="bg-red-600 p-2 rounded-xl my-3" v-if="errors.length">
          <li class="text-white text-sm font-bold" v-for="error in errors">{{ error.message }}</li>
        </ul>

        <div ref="modal" class="flex flex-col">
          <form @submit.prevent="handleFormSubmit">
            <FormsInput v-model="formData.name" label="Menu name" />
            <FormsButton class="mt-2" color="secondary">Save</FormsButton>
          </form>
        </div>
      </FormsModal>

    </div>


    <div class="grid justify-items-center gap-7 p-10 
              sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

      <div v-if="status === 'pending'">
        Loding...
      </div>

      <div v-else class="w-full" v-for="menu in menus">
        <MenuCard :name="menu.name" :link="`/user/menus/${menu.id}/categories/`" @destroy="destroy(menu.id)" />
      </div>

    </div>



  </div>

</template>

<script lang="ts" setup>
const errors = ref<object[]>([])
const open = ref(false)
const formData = ref({
  name: ''
})
const { data: menus, status, refresh } = await useApiFetch('user/v1/menus', { method: 'GET', lazy: true })
async function handleFormSubmit() {

  try {
    const res = await Fetch('user/v1/menus', {
      method: 'POST',
      body: {
        name: formData.value.name
      }

    })
    myToastify('Menu created successfuly', 'success')
    formData.value.name = ''
    open.value = false
    await refresh()
  } catch (error: any) {
    errors.value.push(...error?.data.errors)
  }

}

async function destroy(id) {
  const res = await Fetch(`user/v1/menus/${id}`, {
    method: 'DELETE',
  })
  myToastify('Menu deleted successfuly', 'success')
  await refresh()
}

</script>
