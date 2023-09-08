<template>
  <NuxtLayout name="admin">
    <div class="mt-6 space-y-6 sm:space-y-6">
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Add Songs
        </h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          Add songs by select or drag the folder containing the songs into the
          container below. The files in the subfolder should have the following
          structure: [Artist] - [Title][.*]
        </p>
      </div>
      <div>
        <button
          ref="dropZoneRef"
          type="button"
          class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <DocumentPlusIcon class="mx-auto h-12 w-12 text-gray-400" />
          <span class="mt-2 block text-sm font-semibold text-gray-900"
            >Add new Songs</span
          >
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDropZone } from '@vueuse/core';
import { DocumentPlusIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  setup() {
    const dropZoneRef = ref<HTMLElement>();
    useDropZone(dropZoneRef, (files: File[] | null) => {
      console.log(files);
    });
    return {
      dropZoneRef,
    };
  },
  methods: {},
  components: {
    DocumentPlusIcon,
  },
});
</script>
