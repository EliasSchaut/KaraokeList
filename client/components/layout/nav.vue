<template>
  <Disclosure
    as="nav"
    class="bg-white shadow dark:bg-gray-800"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <!-- NavBar left side -->
          <div
            class="flex flex-shrink-0 items-center text-xl font-semibold leading-6 text-gray-900"
          >
            KaraokeList
          </div>
          <div
            class="hidden border-t dark:border-t-gray-800 sm:ml-6 sm:flex sm:space-x-8"
          >
            <template v-for="link in navigation">
              <NuxtLink
                :to="link.href"
                v-if="!(link.hidden && link.hidden())"
                :class="[
                  $route.path.split('/')[1] === link.href.split('/')[1]
                    ? 'border-indigo-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                ]"
                >{{ link.name }}
              </NuxtLink>
            </template>
          </div>
        </div>

        <!-- NavBar right side -->
        <div class="flex flex-1 items-center justify-end gap-x-6">
          <!-- Settings -->
          <SettingLang class="hidden sm:block" />
          <SettingTheme class="hidden sm:block" />
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="-ml-2.5 mr-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-white"
            >
              <span class="sr-only">{{ $t('common.sr.open_main_menu') }}</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </div>

    <!-- NavBar Panel mobile -->
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <template v-for="link in navigation">
          <NuxtLink
            :to="link.href"
            v-if="!(link.hidden && link.hidden())"
            :class="[
              $route.path.split('/')[1] === link.href.split('/')[1]
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-gray-900 dark:text-white'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
              'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
            ]"
            >{{ link.name }}
          </NuxtLink>
        </template>
      </div>
      <div
        class="flex gap-x-4 border-t border-gray-200 pb-3 pt-4 dark:border-gray-700"
      >
        <SettingLang class="pl-4" />
        <SettingTheme />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authStore } from '~/store/auth';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'LayoutNav',
  data() {
    return {
      navigation: [
        {
          name: 'Tracks',
          href: '/',
        },
        {
          name: 'Reports',
          href: '/reports',
        },
        {
          name: 'Requests',
          href: '/requests',
        },
        {
          name: 'Admin',
          href: '/admin',
          hidden: () => !this.auth.logged_in,
        },
      ] as Array<{ name: string; href: string; hidden?: () => boolean }>,
    };
  },
  setup() {
    const auth = authStore();

    return {
      auth,
    };
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    BellIcon,
    XMarkIcon,
  },
});
</script>
