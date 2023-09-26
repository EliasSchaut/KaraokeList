<template>
  <LayoutLogin v-if="!auth.logged_in" />
  <div v-else class="m-4">
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-semibold leading-6 text-gray-900">
        Admin Panel
      </h3>
      <div>
        <button
          @click="auth.logout()"
          type="button"
          class="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Logout
        </button>
      </div>
    </div>
    <LayoutTabs :tabs="tabs" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authStore } from '~/store/auth';

export default defineComponent({
  data() {
    return {
      tabs: [
        { name: 'Settings', href: '/admin' },
        { name: 'Users', href: '/admin/users' },
        { name: 'Tracks', href: '/admin/tracks' },
      ],
    };
  },
  setup() {
    return {
      auth: authStore(),
    };
  },
});
</script>
