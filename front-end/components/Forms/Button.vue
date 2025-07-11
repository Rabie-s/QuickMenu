<template>
  <button 
    v-bind="$attrs" 
    :class="buttonClasses"
    :disabled="loading || disabled"
    class="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden"
  >
    <!-- Loading spinner -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <div class="spinner"></div>
    </div>
    
    <!-- Button content -->
    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  variant: {
    type: String,
    default: 'solid'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed(() => {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }
  
  // Color and variant classes
  const colorClasses = {
    primary: {
      solid: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    },
    secondary: {
      solid: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500',
      outline: 'border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white focus:ring-emerald-500',
      ghost: 'text-emerald-500 hover:bg-emerald-50 focus:ring-emerald-500'
    },
    danger: {
      solid: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500',
      outline: 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500',
      ghost: 'text-red-500 hover:bg-red-50 focus:ring-red-500'
    },
    warning: {
      solid: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl focus:ring-amber-500',
      outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white focus:ring-amber-500',
      ghost: 'text-amber-500 hover:bg-amber-50 focus:ring-amber-500'
    },
    white: {
      solid: 'bg-white hover:bg-gray-50 text-gray-900 shadow-lg hover:shadow-xl border border-gray-200 focus:ring-gray-500',
      outline: 'border-2 border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white',
      ghost: 'text-white hover:bg-white/10 focus:ring-white'
    },
    ashen: {
      solid: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl focus:ring-gray-500',
      outline: 'border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white focus:ring-gray-500',
      ghost: 'text-gray-500 hover:bg-gray-50 focus:ring-gray-500'
    }
  }
  
  return [
    sizeClasses[props.size] || sizeClasses.md,
    colorClasses[props.color]?.[props.variant] || colorClasses.primary.solid
  ].join(' ')
})
</script>