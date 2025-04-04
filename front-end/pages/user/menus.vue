<template>
    <NuxtLayout>
        <NuxtPage page-key="child" />
    </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'user-auth'
})
</script>