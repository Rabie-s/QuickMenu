<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="props.label !== ''" class="block text-sm font-medium text-gray-700 mb-1.5">
      {{ props.label }}
    </label>

    <!-- Input Field -->
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out text-base text-gray-900 hover:border-gray-400"
    />
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
  type:{
    type:String,
    default:'text'
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>