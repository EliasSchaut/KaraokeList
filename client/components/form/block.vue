<template>
  <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 first:pt-0 md:grid-cols-3">
    <div class="px-4 sm:px-0">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ title }}
      </h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">
        {{ desc }}
      </p>
    </div>

    <Form
      class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      :submit="submit"
    >
      <div class="px-4 py-6 sm:p-8">
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <slot />
        </div>
      </div>
      <div
        v-if="!no_submit"
        class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
      >
        <FormSubmit :label="submit_label" />
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    submit_label: {
      type: String,
      default: 'Submit',
    },
    no_submit: {
      type: Boolean,
      default: false,
    },
    submit: {
      type: Function,
      default: () => {},
    },
  },
});
</script>
