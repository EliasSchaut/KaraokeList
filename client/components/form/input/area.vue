<template>
  <div>
    <div class="flex items-center justify-between">
      <label
        :for="id"
        class="block text-sm font-medium leading-6 text-secondary-900 dark:text-white"
        >{{ label }}</label
      >
      <div v-if="side_label !== null" class="text-sm">
        <NuxtLink
          v-if="side_label.href != null"
          :to="side_label.href"
          class="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >{{ side_label.label }}</NuxtLink
        >
        <span
          v-else
          class="leading-6 text-secondary-500 dark:text-secondary-400"
        >
          {{ side_label.label }}
        </span>
      </div>
    </div>
    <div class="mt-2">
      <textarea
        :id="id"
        :name="id"
        rows="3"
        style="min-height: 36px"
        class="block max-h-screen w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-secondary-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-primary-500 sm:text-sm sm:leading-6"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        :placeholder="placeholder != null ? placeholder : ''"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'FormInputArea',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'About',
    },
    side_label: {
      type: Object as PropType<{ label: string; href: string | null }>,
      default: null,
    },
    sub_label: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    minlength: {
      type: Number,
      default: 1,
    },
    maxlength: {
      type: Number,
      default: 10000,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
});
</script>
