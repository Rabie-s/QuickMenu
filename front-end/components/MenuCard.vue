<template>
    <div v-bind="$attrs">
        
            <div class="flex items-center justify-center rounded-xl bg-cover bg-center text-white text-3xl font-extrabold shadow-lg
            h-48 w-full relative overflow-hidden cursor-pointer
            transition ease-in-out hover:-translate-y-1
            hover:scale-110 bg-[url('~/assets/images/res1.jpeg')]">
            <NuxtLink :to="props.link">
                <span class="text-4xl md:text-5xl lg:text-6xl backdrop-blur-sm bg-black/20 px-6 py-3 rounded-lg">
                    {{ props.name }}
                </span>
            </NuxtLink>

            <div @click="$emit('destroy')" class="absolute bottom-1 ">
                <i class="fa-solid fa-trash text-lg hover:text-red-600"></i>
            </div>

            </div>
        
    </div>



</template>

<script setup lang="ts">
const props = defineProps({
    link: {
        type: String
    },
    name: {
        type: String
    },
})

</script>