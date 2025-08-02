// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
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
      page_size: Number(process.env.TABLE_PAGE_SIZE),
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-03-15',
  workspaceDir: '.',
  srcDir: './client/',
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/apollo',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'dayjs-nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
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
    restructureDir: false,
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
    lazy: true,
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  dayjs: {
    locales: ['en', 'de'],
    plugins: ['duration', 'timezone'],
    defaultLocale: 'de',
    defaultTimezone: 'Europe/Berlin',
  },

  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 30,
    },
  },
});
