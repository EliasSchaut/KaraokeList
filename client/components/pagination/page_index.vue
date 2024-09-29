<template>
  <button
    class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium text-gray-500"
    :disabled="disabled"
    :class="{
      'border-indigo-500 text-indigo-600': active,
      'border-transparent': !active,
      'hover:border-gray-300 hover:text-gray-700': !active && !disabled,
      'cursor-not-allowed': disabled,
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
