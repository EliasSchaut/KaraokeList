<template>
  <Disclosure
    as="nav"
    class="bg-secondary-50 shadow dark:bg-secondary-800"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <!-- NavBar left side -->
          <nuxt-link
            class="flex flex-shrink-0 items-center text-xl font-bold leading-6 text-secondary-900 hover:underline dark:text-white"
            href="/"
          >
            {{ proj_name }}
          </nuxt-link>
          <div
            class="hidden border-t dark:border-t-secondary-800 md:ml-6 md:flex md:space-x-8"
          >
            <template v-for="link in navigation">
              <NuxtLink
                :to="link.href"
                v-if="!(link.hidden && link.hidden())"
                :class="[
                  $route.path.split('/')[1] === link.href.split('/')[1]
                    ? 'border-primary-500 text-secondary-900 dark:text-white'
                    : 'border-transparent text-secondary-500 hover:border-secondary-300 hover:text-secondary-700 dark:hover:text-white',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-semibold',
                ]"
                >{{ link.name }}
              </NuxtLink>
            </template>
          </div>
        </div>

        <!-- NavBar right side -->
        <div class="flex flex-1 items-center justify-end gap-x-6">
          <!-- Settings -->
          <SettingLang class="hidden md:block" />
          <SettingTheme class="hidden md:block" />
          <div class="-mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="-ml-2.5 mr-2.5 inline-flex items-center justify-center rounded-md p-2 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:hover:bg-secondary-700 dark:hover:text-white dark:focus:ring-white"
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
    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <template v-for="link in navigation">
          <NuxtLink
            :to="link.href"
            v-if="!(link.hidden && link.hidden())"
            :class="[
              $route.path.split('/')[1] === link.href.split('/')[1]
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-secondary-900 dark:text-white'
                : 'border-transparent text-secondary-500 hover:border-secondary-300 hover:bg-secondary-50 hover:text-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-white',
              'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
            ]"
            >{{ link.name }}
          </NuxtLink>
        </template>
      </div>
      <div
        class="flex justify-between gap-x-4 border-t border-secondary-200 px-4 pb-3 pt-4 dark:border-secondary-700"
      >
        <SettingLang class="w-full" />
        <SettingTheme class="w-full" />
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

type NavigationType = Array<{
  name: string;
  href: string;
  hidden?: () => boolean;
}>;

export default defineComponent({
  setup() {
    const auth = reactive(authStore());
    const proj_name = useRuntimeConfig();
    const { t } = useI18n();

    return {
      auth,
      navigation: computed(() => [
        {
          name: t('nav.pages.tracks'),
          href: '/',
        },
        {
          name: t('nav.pages.reports'),
          href: '/reports',
        },
        {
          name: t('nav.pages.requests'),
          href: '/requests',
        },
        {
          name: 'Admin',
          href: '/admin',
          hidden: () => !auth.logged_in,
        },
      ]),
      proj_name: proj_name.public.proj_name,
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
