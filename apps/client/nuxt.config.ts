// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-08-02',
  workspaceDir: '.',
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/apollo',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'dayjs-nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
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

  alias: {
    '@/prisma/*': './prisma/*',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    config: {},
    viewer: true,
    exposeConfig: false,
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
    langDir: './app/locales',
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
