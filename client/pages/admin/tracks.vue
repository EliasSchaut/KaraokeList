<template>
  <NuxtLayout name="admin">
    <div class="space-y-10 divide-y divide-gray-900/10 pt-10">
      <!-- Single Track -->
      <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div class="px-4 sm:px-0">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Add single track
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This song will be added to the database and visible immediately.
          </p>
        </div>

        <Form
          class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <FormInput
                class="sm:col-span-3"
                id="track"
                label="Track Title"
                type="text"
                maxlength="100"
                required
              />
              <FormInput
                class="sm:col-span-3"
                id="artist"
                label="Track Artist"
                type="text"
                maxlength="100"
                required
              />
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
          >
            <FormSubmit label="Add single track" />
          </div>
        </Form>
      </div>
      <!-- Multiple Tracks -->
      <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div class="px-4 sm:px-0">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Add multiple tracks
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Add multiple tracks at once by entering the following text in the
            textarea: [Artist] - [Title];[Artist] - [Title];...
          </p>
        </div>

        <Form
          class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <FormInputArea
                class="col-span-full"
                id="tracks"
                placeholder="Artist1 - Title1; Artist2 - Title2; ..."
                label="Tracks"
                type="text"
                maxlength="10000"
                required
              />
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
          >
            <FormSubmit label="Add multiple tracks" />
          </div>
        </Form>
      </div>
      <!-- Upload Tracks -->
      <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div class="px-4 sm:px-0">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Add multiple tracks via upload
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Upload a folder containing the songs. The files in the subfolder
            should have the following names: [Artist] - [Title]
          </p>
        </div>

        <Form
          class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
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
            </div>
          </div>
        </Form>
      </div>
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
