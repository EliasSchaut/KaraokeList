<template>
  <div>
    <button
      type="submit"
      class="disabled: flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:bg-indigo-600"
      :disabled="session.loading"
    >
      <span v-if="!session.loading">{{ label }}</span>
      <Spinner v-else class="border-red h-6 w-6" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { sessionStore } from '~/store/session';

export default defineComponent({
  name: 'FormSubmit',
  props: {
    label: {
      type: String,
      default: 'Submit',
    },
  },
  setup() {
    return {
      session: sessionStore(),
    };
  },
});
</script>
