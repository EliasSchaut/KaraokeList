<template>
  <div
    :class="[
      focus
        ? 'border-secondary-400 dark:border-secondary-500'
        : 'border-secondary-200 dark:border-secondary-700',
      'border-secondary-200 relative mx-2 mb-3 border-b transition duration-[100ms] ease-in-out',
    ]"
  >
    <label for="search-field" class="sr-only">Search</label>
    <MagnifyingGlassIcon
      class="text-secondary-400 dark:text-secondary-500 pointer-events-none absolute inset-y-0 left-0 h-full w-5"
      aria-hidden="true"
    />
    <input
      @focusin="focus = true"
      @focusout="focus = false"
      v-bind="$attrs"
      id="search-field"
      class="text-secondary-900 placeholder:text-secondary-400 dark:bg-secondary-900 dark:text-secondary-400 dark:placeholder:text-secondary-500 block h-full w-full border-0 bg-white pr-0 pl-8 focus:ring-0"
      :placeholder="$t('common.search')"
      type="search"
      name="search"
    />
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

const focus = ref(false);
</script>
