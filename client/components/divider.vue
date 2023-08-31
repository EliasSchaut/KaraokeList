<template>
  <div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-200" />
      </div>
      <div
        v-if="content !== ''"
        class="relative flex justify-center text-sm font-medium leading-6"
      >
        <span class="bg-white px-6 text-gray-900">{{ content }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
  },
});
</script>
