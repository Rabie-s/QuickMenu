<template>

  <button v-bind="$attrs" v-if="props.color === 'primary'" class="bg-blue-600 hover:bg-blue-500 active:bg-[#265BB3] cursor-pointer
     text-white h-[30px] min-w-[93px] text-center rounded-sm"><slot/></button>

  <button v-bind="$attrs" v-if="props.color === 'secondary'" class=" bg-emerald-500
      hover:bg-emerald-400 active:bg-[#049B74] cursor-pointer
     text-white h-[30px] min-w-[93px] text-center rounded-sm"><slot/></button>

  <button v-bind="$attrs" v-if="props.color === 'danger'" class="bg-danger
      hover:bg-danger-hover active:bg-[#C34D24] cursor-pointer
     text-white h-[30px] min-w-[93px] text-center rounded-sm"><slot/></button>

  <button v-bind="$attrs" v-if="props.color === 'ashen'" class="bg-ashen
      hover:bg-ashen-hover active:bg-[#495057] cursor-pointer
     text-white h-[30px] min-w-[93px] text-center rounded-sm"><slot/></button>

     <button v-bind="$attrs" v-if="props.color === 'white'" class="bg-white
      hover:bg-[#e9e9e9] active:bg-[#dedede] cursor-pointer
     text-black h-[30px] min-w-[93px] text-center rounded-sm"><slot/></button>

</template>

<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  }
})
</script>

<style></style>