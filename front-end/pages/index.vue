<template>
<NavBar/>
    <div class="grid grid-cols-1 md:grid-cols-2">

        <div class="order-2 md:order-1 flex justify-center flex-col p-7">
            <h1 class="text-6xl font-extrabold">QuickMenu</h1>
            <p class="font-semibold text-base/7">
                Easily design and share your menu with our platform! Create a menu, generate a QR code, and let others
                vote on their favorite dishes. Perfect for restaurants, events, or gatherings. Start now and discover
                what your audience loves!
            </p>
        </div>

        <img class="order-1 md:order-2" src="~/assets/images/qr-image.jpg">

    </div>


</template>

<script lang="ts" setup>
definePageMeta({
    layout:false
})
</script>
