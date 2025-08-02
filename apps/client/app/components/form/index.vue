<template>
  <form @submit.prevent="validate">
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { sessionStore } from '~/store/session';

export default defineComponent({
  name: 'Form',
  methods: {
    validate(e: Event) {
      const form_html = e.target as HTMLFormElement;
      if (!form_html.checkValidity()) {
        form_html.reportValidity();
      } else {
        this.session.loading = true;
        const form_data = new FormData(form_html);
        try {
          this.submit(e, form_data);
        } catch (e) {
          console.error(e);
        } finally {
          this.session.loading = false;
        }
      }
    },
  },
  props: {
    submit: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return {
      session: sessionStore(),
    };
  },
});
</script>
