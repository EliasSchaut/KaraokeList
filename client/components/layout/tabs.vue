<template>
  <div class="relative border-b border-gray-200 pb-5 sm:pb-0">
    <div class="mt-4">
      <div class="sm:hidden">
        <label for="current-tab" class="sr-only">Select a tab</label>
        <select
          @input="$router.push($refs.selectRef.value)"
          ref="selectRef"
          id="current-tab"
          name="current-tab"
          class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        >
          <option
            v-for="tab in tabs"
            :key="tab.name"
            :value="tab.href"
            :selected="$route.path === tab.href"
          >
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8">
          <NuxtLink
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.href"
            :class="[
              $route.path === tab.href
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
            ]"
            :aria-current="$route.path === tab.href ? 'page' : undefined"
            >{{ tab.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { authStore } from '~/store/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      auth: authStore(),
    };
  },
  props: {
    tabs: {
      type: Array<{ name: string; href: string }>,
      required: true,
    },
  },
});
</script>
