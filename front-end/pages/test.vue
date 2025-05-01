<template>
  <div class="max-w-4xl mx-auto p-4">
    <TabGroup>
      <!-- التبويبات: الأقسام -->
      <TabList class="flex space-x-2 mb-6 border-b border-gray-300 pb-2 overflow-auto">
        <Tab
          v-for="category in menu[0].categories"
          :key="category.id"
          as="button"
          class="px-4 py-2 text-base font-semibold text-gray-700 rounded-t-md transition"
        >
          {{ category.name }}
        </Tab>
      </TabList>

      <!-- المحتوى: الأصناف داخل كل قسم -->
      <TabPanels>
        <TabPanel
          v-for="category in menu[0].categories"
          :key="category.id"
          class="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div
            v-if="category.menuItems.length"
            v-for="item in category.menuItems"
            :key="item.id"
            class="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
          >
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

// البيانات القادمة من الباك إند (تقدر تجيبها من API مستقبلاً)
const menu = [
  {
    id: 40,
    name: "AL-REEM",
    categories: [
      {
        id: 16,
        name: "Sandwich ",
        menuItems: [
          {
            id: 14,
            name: "Shawrma-reguler",
            price: "1.50",
            description: "none",
          },
          {
            id: 15,
            name: "Shawrma-super",
            price: "2.00",
            description: null,
          },
          {
            id: 20,
            name: "Zinger meel",
            price: "3.00",
            description: "asa",
          },
        ],
      },
      {
        id: 17,
        name: "Snaks",
        menuItems: [],
      },
      {
        id: 19,
        name: "dddfsa",
        menuItems: [],
      },
    ],
  },
]
</script>
