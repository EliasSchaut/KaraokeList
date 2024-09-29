import type { Config } from 'tailwindcss';
import colors = require('tailwindcss/colors');

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.gray,
      },
      fontFamily: {
        nunito: 'Nunito, sans-serif',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
