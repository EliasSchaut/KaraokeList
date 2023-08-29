<template>
  <div class="relative mx-2 mb-3 border-b">
    <label for="search-field" class="sr-only">Search</label>
    <MagnifyingGlassIcon
      class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
      aria-hidden="true"
    />
    <input
      v-bind="$attrs"
      id="search-field"
      class="block h-full w-full border-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0"
      placeholder="Search..."
      type="search"
      name="search"
    />
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
</script>
