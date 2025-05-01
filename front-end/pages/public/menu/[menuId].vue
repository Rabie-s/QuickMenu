<template>
  <div class="container mx-auto mt-10">
    <TabGroup as="div">
    <TabList as="div" class="flex space-x-2 mb-6 border-b border-gray-300 pb-2 overflow-auto">
      <Tab v-for="category in data[0].categories" :key="category.id"
        class="px-4 py-2 text-base font-semibold text-gray-700 rounded-t-md transition">
        {{ category.name }}
      </Tab>
    </TabList>

    <TabPanels as="div">
      <TabPanel v-for="category in data[0].categories" :key="category.id" as="div"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-if="category.menuItems.length" v-for="item in category.menuItems" :key="item.id"
          class="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
          <h3 class="text-lg font-bold text-gray-800">{{ item.name }}</h3>
          <p class="text-sm text-gray-600">{{ item.description || 'بدون وصف' }}</p>
          <div class="mt-2 text-right font-semibold text-green-600">
            {{ item.price }} د.أ
          </div>
        </div>

        <div v-else class="text-gray-500 col-span-full text-center py-4">
          لا توجد أصناف في هذا القسم حالياً.
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup> 
  </div>




</template>
<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
const { menuId } = useRoute().params
const { data } = await useFetch(`http://localhost:3333/public/menu/${menuId}`)

</script>