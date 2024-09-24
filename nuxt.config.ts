// https://nuxt.com/docs/api/configuration/nuxt-config
export default async () => {
  return defineNuxtConfig({
    alias: {
      '@/prisma/*': './prisma/*',
    },
    app: {
      head: {
        title: process.env.PROJECT_NAME,
      },
    },
    runtimeConfig: {
      public: {
        proj_name: process.env.PROJECT_NAME,
      },
    },
    devServer: {
      port: process.env.PORT_FRONTEND,
    },
    devtools: { enabled: true },
    workspaceDir: '.',
    srcDir: 'client/',
    modules: [
      '@nuxtjs/i18n',
      '@nuxtjs/apollo',
      '@nuxtjs/tailwindcss',
      '@nuxtjs/color-mode',
      '@nuxt/image',
      'dayjs-nuxt',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@vueuse/nuxt',
    ],

    apollo: {
      autoImports: true,
      proxyCookies: true,
      clients: {
        default: {
          tokenName: 'token',
          tokenStorage: 'cookie',
          authType: 'Bearer',
          authHeader: 'Authorization',
          httpEndpoint: process.env.URL_BACKEND_ENDPOINT as string,
        },
      },
    },

    i18n: {
      langDir: 'locales',
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          name: 'English',
          isCatchallLocale: true,
          file: 'en-US.json',
        },
        {
          code: 'de',
          iso: 'de-DE',
          name: 'Deutsch',
          file: 'de-DE.json',
        },
      ],
      defaultLocale: 'en',
      strategy: 'no_prefix',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',
        fallbackLocale: 'en',
      },
      baseUrl: process.env.URL_FRONTEND,
      lazy: true,
    },

    colorMode: {
      preference: 'system',
      fallback: 'dark',
      classSuffix: '',
      storageKey: 'nuxt-color-mode',
    },

    tailwindcss: {
      configPath: 'tailwind.config.ts',
    },

    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },

    dayjs: {
      locales: ['en', 'de'],
      plugins: ['duration'],
      defaultLocale: 'de',
      defaultTimeZone: 'Europe/Berlin',
    },

    pinia: {
      autoImports: ['defineStore'],
    },

    piniaPersistedstate: {
      cookieOptions: {
        maxAge: 60 * 60 * 24 * 30,
      },
    },
  });
};
