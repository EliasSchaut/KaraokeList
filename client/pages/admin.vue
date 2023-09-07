<template>
  <LayoutLogin v-if="auth.logged_in" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authStore } from '~/store/auth';

export default defineComponent({
  setup() {
    return {
      auth: authStore(),
    };
  },
});
</script>
