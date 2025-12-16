<template>
  <div class="flex items-center justify-center">
    <button
      v-if="settings.theme === 'light'"
      @click="settings.setTheme('dark')"
    >
      <SunIcon
        class="text-second-600 group-hover:text-second-500 dark:text-second-400 h-6 w-6"
        aria-hidden="true"
      />
    </button>
    <button
      v-else-if="settings.theme === 'dark'"
      @click="settings.setTheme('system')"
    >
      <MoonIcon
        class="text-second-600 group-hover:text-second-500 dark:text-second-400 h-6 w-6"
        aria-hidden="true"
      />
    </button>
    <button v-else @click="settings.setTheme('light')">
      <ComputerDesktopIcon
        class="text-second-600 group-hover:text-second-500 dark:text-second-400 h-6 w-6"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script lang="ts">
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/vue/24/outline';
import { settingsStore } from '~/store/settings';

export default defineComponent({
  name: 'SettingTheme',
  methods: { ComputerDesktopIcon, MoonIcon, SunIcon },
  components: {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
  },
  setup() {
    return {
      settings: settingsStore(),
    };
  },
});
</script>
