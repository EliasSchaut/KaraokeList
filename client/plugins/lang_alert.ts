import { alertStore } from '@/store/alert';

export default defineNuxtPlugin(({ hook }) => {
  const alert = alertStore();
  hook('i18n:beforeLocaleSwitch', () => {
    alert.hide();
  });
});
