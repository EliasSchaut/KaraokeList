<template>
  <div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div
          class="w-full border-t border-secondary-200 dark:border-secondary-400"
        />
      </div>
      <div
        v-if="content !== ''"
        class="relative flex justify-center text-sm font-medium leading-6"
      >
        <span
          class="bg-white px-6 text-secondary-900 dark:bg-secondary-900 dark:text-secondary-400"
          >{{ content }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: String,
    default: '',
  },
});
</script>
