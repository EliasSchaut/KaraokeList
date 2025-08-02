<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="text-secondary-900 ring-secondary-300 hover:bg-secondary-50 dark:ring-secondary-600 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset dark:bg-white/10 dark:hover:bg-white/20"
      >
        <slot />
        <ChevronDownIcon
          class="text-secondary-400 -mr-1 h-5 w-5"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="divide-secondary-100 ring-opacity-5 dark:bg-secondary-800 dark:ring-secondary-600 absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:text-white"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }" v-for="item in items">
            <button
              @click="item.callback"
              :class="[
                active
                  ? 'bg-secondary-100 text-secondary-900 dark:bg-secondary-900 dark:text-secondary-100'
                  : 'text-secondary-700 dark:text-secondary-300',
                'group flex w-full items-center px-4 py-2 text-sm',
              ]"
            >
              <component
                :is="item.icon()"
                class="text-secondary-400 group-hover:text-secondary-500 mr-3 h-5 w-5"
              />
              {{ item.label }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

export default defineComponent({
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
  },
  props: {
    items: {
      type: Object as PropType<
        {
          icon: () => {};
          label: string;
          callback: () => {};
        }[]
      >,
      required: true,
    },
  },
});
</script>
