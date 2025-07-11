<template>
    <div>
        <NuxtLink :to="pros.link">
            <div class="flex justify-center items-center rounded-xl h-14 w-full
       transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer text-white bg-orange-400">
                <span class="text-4xl font-bold md:text-2xl lg:text-3xl">{{ pros.name }}</span>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const pros = defineProps({
    link: {
        type: String
    },
    name: {
        type: String
    }
})
</script>