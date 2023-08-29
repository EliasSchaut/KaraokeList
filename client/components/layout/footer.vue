<template>
  <footer class="bg-white dark:bg-gray-800">
    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
      <nav
        class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        :aria-label="$t('footer.title')"
      >
        <div
          v-for="item in [
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
            class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            {{ item.name }}
          </NuxtLink>
          <a
            v-else
            :href="item.href"
            target="_blank"
            class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            >{{ item.name }}</a
          >
        </div>
      </nav>
      <p
        class="mt-10 text-center text-xs leading-5 text-gray-500 dark:text-gray-300"
      >
        &copy; 2023 Elias Lorenz Schaut
      </p>
    </div>
  </footer>
</template>
