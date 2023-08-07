<template>
  <div class="border-b border-gray-200 p-5 pb-5">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold leading-6 text-gray-900">
        Karaoke List
      </h1>
      <form
        class="relative hidden flex-1 sm:mx-4 sm:flex"
        action="#"
        method="GET"
      >
        <label for="search-field" class="sr-only">Search</label>
        <MagnifyingGlassIcon
          class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          id="search-field"
          class="block h-full w-full border-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0"
          placeholder="Search..."
          type="search"
          name="search"
        />
      </form>
      <div class="flex items-center justify-center sm:mt-0">
        <SettingLang class="pr-4" />
        <SettingTheme />
      </div>
    </div>
    <form
      class="relative mt-4 flex flex-1 sm:mx-4 sm:hidden"
      action="#"
      method="GET"
    >
      <label for="search-field" class="sr-only">Search</label>
      <MagnifyingGlassIcon
        class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
        aria-hidden="true"
      />
      <input
        id="search-field"
        class="block h-full w-full border-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0"
        placeholder="Search..."
        type="search"
        name="search"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
</script>
