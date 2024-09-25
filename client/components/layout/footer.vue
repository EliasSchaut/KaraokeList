<template>
  <footer class="bg-white dark:bg-secondary-800">
    <div v-if="debug">
      <button class="border" @click="auth.toggle_login()">
        {{ 'Logged In: ' + auth.logged_in }}
      </button>
      <span class="ms-1 border">
        {{
          'Token: ' +
          auth.token.substring(0, 10) +
          (auth.token.length ? '...' : '')
        }}
      </span>
      <span class="ms-1 border">
        {{ 'Route: ' + $route.path }}
      </span>
      <button class="ms-1 border" @click="session.loading = !session.loading">
        {{ 'Loading: ' + session.loading }}
      </button>
    </div>

    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
      <nav
        class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        :aria-label="$t('footer.title')"
      >
        <div
          v-for="item in [
            {
              name: 'Admin',
              href: '/admin',
              intern: true,
            },
            {
              name: $t('footer.source'),
              href: 'https://github.com/EliasSchaut/KaraokeList',
            },
            { name: $t('footer.imprint'), href: '/imprint', intern: true },
            { name: $t('footer.privacy'), href: '/privacy', intern: true },
          ]"
          :key="item.name"
          class="pb-6"
        >
          <NuxtLink
            v-if="item?.intern"
            :to="item.href"
            class="text-sm leading-6 text-secondary-600 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-400"
          >
            {{ item.name }}
          </NuxtLink>
          <a
            v-else
            :href="item.href"
            target="_blank"
            class="text-sm leading-6 text-secondary-600 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-400"
            >{{ item.name }}</a
          >
        </div>
      </nav>
      <p
        class="mt-10 text-center text-xs leading-5 text-secondary-500 dark:text-secondary-300"
      >
        &copy; 2023-2024 Elias Lorenz Schaut
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { authStore } from '~/store/auth';
import { sessionStore } from '~/store/session';

const debug = process.env.NODE_ENV !== 'production';
const auth = authStore();
const session = sessionStore();
</script>
