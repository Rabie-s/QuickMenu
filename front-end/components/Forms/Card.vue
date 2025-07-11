<template>
  <div :class="cardClasses" class="bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-100">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md'
  },
  variant: {
    type: String,
    default: 'default'
  }
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-100'
  
  const sizeClasses = {
    sm: 'p-6 max-w-sm',
    md: 'p-8 max-w-md',
    lg: 'p-10 max-w-lg',
    xl: 'p-12 max-w-xl'
  }
  
  const variantClasses = {
    default: '',
    glass: 'glass border-white/20',
    gradient: 'bg-gradient-to-br from-white to-gray-50'
  }
  
  return [
    baseClasses,
    sizeClasses[props.size] || sizeClasses.md,
    variantClasses[props.variant] || ''
  ].join(' ')
})
</script>