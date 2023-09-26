<template>
  <NuxtLayout name="admin">
    <div class="space-y-10 divide-y divide-gray-900/10 pt-10">
      <FormBlock
        title="Add single track"
        desc="This song will be added to the database and visible immediately."
        submit_label="Add single track"
      >
        <FormInput
          class="sm:col-span-3"
          id="track"
          label="Track Title"
          type="text"
          :maxlength="100"
          required
        />
        <FormInput
          class="sm:col-span-3"
          id="artist"
          label="Track Artist"
          type="text"
          :maxlength="100"
          required
        />
      </FormBlock>
      <FormBlock
        title="Add multiple tracks"
        desc="Add multiple tracks at once by entering the following text in the
            textarea: [Artist] - [Title];[Artist] - [Title];..."
        submit_label="Add multiple tracks"
      >
        <FormInputArea
          class="col-span-full"
          id="tracks"
          placeholder="Artist1 - Title1; Artist2 - Title2; ..."
          label="Tracks"
          type="text"
          :maxlength="10000"
          required
        />
      </FormBlock>
      <FormBlock
        title="Add multiple tracks via upload"
        desc="Upload a folder containing the songs. The files in the subfolder
            should have the following names: [Artist] - [Title]"
        no_submit
      >
        <button
          @click="open()"
          ref="dropZoneRef"
          type="button"
          class="col-span-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <DocumentPlusIcon class="mx-auto h-12 w-12 text-gray-400" />
          <span class="mt-2 block text-sm font-semibold text-gray-900"
            >Add new tracks</span
          >
        </button>
      </FormBlock>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDropZone, useFileDialog } from '@vueuse/core';
import { DocumentPlusIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  setup() {
    const { files, open, reset, onChange } = useFileDialog({
      multiple: true,
      accept: '*/*',
    });

    const dropZoneRef = ref<HTMLElement>();
    useDropZone(dropZoneRef, (files: File[] | null) => {
      console.log(files);
    });
    return {
      dropZoneRef,
      open,
    };
  },
  methods: {},
  components: {
    DocumentPlusIcon,
  },
});
</script>
