<template>
  <LayoutLogin v-if="!auth.logged_in" />
  <div v-else class="m-4">
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
        { name: 'General', href: '/admin' },
        { name: 'Admins', href: '/admin/admins' },
        { name: 'Songs', href: '/admin/songs' },
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
