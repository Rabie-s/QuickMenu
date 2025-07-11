<template>
  <div class="w-full space-y-2">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-semibold text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Icon -->
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i :class="icon" class="text-gray-400"></i>
      </div>

      <!-- Input Field -->
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
        :class="inputClasses"
        class="w-full rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-20 placeholder-gray-400 text-gray-900"
      />

      <!-- Loading Spinner -->
      <div v-if="loading" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <div class="spinner"></div>
      </div>
    </div>

    <!-- Helper Text -->
    <p v-if="helperText" class="text-sm text-gray-500">
      {{ helperText }}
    </p>

    <!-- Error Message -->
    <p v-if="error" class="text-sm text-red-600 flex items-center">
      <i class="fas fa-exclamation-circle mr-1"></i>
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  icon: {
    type: String,
    default: ""
  },
  error: {
    type: String,
    default: ""
  },
  helperText: {
    type: String,
    default: ""
  },
  required: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

const inputClasses = computed(() => {
  const paddingClasses = props.icon ? 'pl-10 pr-4 py-3.5' : 'px-4 py-3.5'
  const stateClasses = props.error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' 
    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white hover:border-gray-300'
  
  return [paddingClasses, stateClasses].join(' ')
})
</script>