import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-12-16',
  workspaceDir: '.',
  modules: [
    '@nuxtjs/apollo',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'dayjs-nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-meilisearch',
  ],

  typescript: {
    typeCheck: true,
  },

  runtimeConfig: {
    public: {
      proj_name: process.env.PROJECT_NAME,
      page_size: Number(process.env.TABLE_PAGE_SIZE),
    },
  },

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
    restructureDir: 'app',
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
    defaultLocale: 'en',
    defaultTimezone: process.env.TZ,
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    config: {},
    viewer: true,
    exposeConfig: false,
  },

  meilisearch: {
    hostUrl: process.env.MEILI_HOST,
    searchApiKey: process.env.MEILI_API_KEY,
    serverSideUsage: true,
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
    families: [
      {
        name: 'Nunito',
        provider: 'local',
      },
      {
        name: 'Geist',
        provider: 'local',
      },
      {
        name: 'Fredoka',
        provider: 'local',
      },
    ],
  },

  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 30,
    },
  },
});
