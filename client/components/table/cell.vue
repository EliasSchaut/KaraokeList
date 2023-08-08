<template>
  <td
    :class="[
      'px-3 py-4 text-sm text-gray-900 sm:w-auto sm:max-w-none',
      first ? 'pl-4 pr-3 sm:pl-3' : '',
      last ? 'pl-3 pr-4 text-right sm:pr-3' : '',
      bold ? 'font-medium' : '',
      main ? 'w-full' : '',
      hidden_on_sm ? 'hidden sm:table-cell' : '',
    ]"
  >
    <!-- py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 -->
    <slot />
  </td>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    first: {
      type: Boolean,
      default: false,
    },
    last: {
      type: Boolean,
      default: false,
    },
    bold: {
      type: Boolean,
      default: false,
    },
    main: {
      type: Boolean,
      default: false,
    },
    hidden_on_sm: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
