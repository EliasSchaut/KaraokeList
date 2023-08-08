<template>
  <th
    scope="col"
    :class="[
      'py-3.5 text-left text-sm font-semibold text-gray-900',
      first ? 'pl-4 pr-3 sm:pl-3' : 'px-3',
      last ? 'pl-3 pr-4 sm:pr-3' : 'px-3',
      hidden ? 'hidden' : '',
      hidden_on_sm ? 'hidden sm:table-cell' : '',
    ]"
  >
    <slot />
  </th>
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
    hidden: {
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
