<template>
  <div
    v-if="!has_only_one_page"
    class="flex items-end justify-between border-t border-gray-200 px-4 sm:px-0"
  >
    <div class="-mt-px flex w-0 flex-1">
      <button
        v-if="!is_first_page"
        @click="previous_page"
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        <ArrowLongLeftIcon
          class="mr-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        Previous
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <PaginationPageIndex @click="set_page(1)" :active="current_page === 1">
        1
      </PaginationPageIndex>
      <PaginationPageIndex v-if="!is_first_site" disabled>
        ...
      </PaginationPageIndex>
      <PaginationPageIndex v-else @click="set_page(2)" :active="is_second_page">
        2
      </PaginationPageIndex>
      <PaginationPageIndex
        v-for="step in steps"
        :key="step"
        @click="set_page(steps_to_page(step))"
        :active="current_page === steps_to_page(step)"
      >
        {{ steps_to_page(step) }}
      </PaginationPageIndex>
      <PaginationPageIndex
        v-if="!is_last_site && !all_pages_fit_on_screen"
        disabled
      >
        ...
      </PaginationPageIndex>
      <PaginationPageIndex
        v-else-if="!all_pages_fit_on_screen"
        @click="set_page(total_pages - 1)"
        :active="is_penultimate_page"
      >
        {{ total_pages - 1 }}
      </PaginationPageIndex>
      <PaginationPageIndex
        @click="set_page(total_pages)"
        :active="is_last_page"
      >
        {{ total_pages }}
      </PaginationPageIndex>
    </div>
    <div class="text-gray-500 md:hidden">
      {{ current_page }} / {{ total_pages }}
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        v-if="!is_last_page"
        @click="next_page"
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        Next
        <ArrowLongRightIcon
          class="ml-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';

export default defineComponent({
  components: {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
  },
  emits: ['update:current_page'],
  computed: {
    is_first_page() {
      return this.current_page === 1;
    },
    is_second_page() {
      return this.current_page === 2;
    },
    is_last_page() {
      return this.current_page === this.total_pages;
    },
    is_penultimate_page() {
      return this.current_page === this.total_pages - 1;
    },
    is_first_site() {
      return this.current_page < 7;
    },
    is_last_site() {
      return this.current_page > this.total_pages - 7;
    },
    has_only_one_page() {
      return this.total_pages === 1;
    },
    all_pages_fit_on_screen() {
      return this.total_pages <= 11;
    },
    steps() {
      if (this.all_pages_fit_on_screen) {
        return Array.from({ length: this.total_pages - 3 }, (_, i) => i + 3);
      } else if (this.is_first_site) {
        return Array.from({ length: 7 }, (_, i) => i + 3);
      } else if (this.is_last_site) {
        return Array.from({ length: 7 }, (_, i) => this.total_pages - 8 + i);
      } else {
        return Array.from({ length: 7 }, (_, i) => i - 3);
      }
    },
  },
  methods: {
    steps_to_page(step: number) {
      if (this.is_first_site || this.is_last_site) {
        return step;
      } else {
        return this.current_page + step;
      }
    },
    set_page(page: number) {
      this.$emit('update:current_page', page);
    },
    previous_page() {
      this.$emit('update:current_page', this.current_page - 1);
    },
    next_page() {
      this.$emit('update:current_page', this.current_page + 1);
    },
  },
  props: {
    current_page: {
      type: Number,
      required: true,
    },
    total_pages: {
      type: Number,
      required: true,
    },
  },
});
</script>
