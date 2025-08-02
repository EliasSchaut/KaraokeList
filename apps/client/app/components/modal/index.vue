<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="bg-secondary-500 bg-opacity-75 dark:bg-secondary-900 dark:bg-opacity-75 fixed inset-0 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="dark:bg-secondary-900 relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left break-words shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6 dark:text-white"
              v-bind="$attrs"
            >
              <div v-if="close_x" class="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  class="text-secondary-400 hover:text-secondary-500 dark:bg-secondary-900 dark:text-secondary-500 dark:hover:text-secondary-400 rounded-md bg-white focus:outline-none"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <slot />
              <div v-if="!own_buttons" class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 dark:bg-primary-500 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  @click="open = false"
                >
                  Go back
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Modal',
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    XMarkIcon,
  },
  setup() {
    return {
      open: ref(false),
    };
  },
  methods: {
    show() {
      this.open = true;
    },
    hide() {
      this.open = false;
    },
  },
  props: {
    own_buttons: {
      type: Boolean,
      default: false,
    },
    close_x: {
      type: Boolean,
      default: false,
    },
    big: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
