<template>
  <a
    :href="href"
    target="_blank"
    class="flex w-full items-center justify-center gap-3 rounded-md bg-[#1DB954] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
  >
    <IconSpotify class="h-5 w-5" />
    <span class="text-sm font-semibold leading-6">Spotify</span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true,
    },
  },
});
</script>
