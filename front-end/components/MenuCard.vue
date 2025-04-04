<template>
    <div v-bind="$attrs">
        <NuxtLink :to="pros.link">
            <div class="flex items-center justify-center rounded-xl bg-cover bg-center text-white text-3xl font-extrabold shadow-lg
        h-48 w-full relative overflow-hidden cursor-pointer
         transition ease-in-out hover:-translate-y-1
          hover:scale-110 bg-[url('~/assets/images/res1.jpeg')]">
                <span class="text-4xl md:text-5xl lg:text-6xl backdrop-blur-sm bg-black/20 px-6 py-3 rounded-lg">
                    {{ pros.name }}
                </span>

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