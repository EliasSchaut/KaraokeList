<template>
  <Body class="bg-gray-100" />
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white"
      >
        {{ 'Admin Login' }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div
        class="bg-white px-6 py-12 shadow dark:bg-gray-800 sm:rounded-lg sm:px-12"
      >
        <form class="space-y-6" @submit.prevent="submit_login">
          <FormInputUsername id="username" required />
          <FormInputPassword id="password" required />
          <FormSubmit label="Submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EnvelopeIcon, KeyIcon } from '@heroicons/vue/20/solid';
import { defineComponent } from 'vue';
import { authStore } from '@/store/auth';
import { alertStore } from '@/store/alert';

export default defineComponent({
  name: 'Login',
  components: {
    EnvelopeIcon,
    KeyIcon,
  },
  setup() {
    return {
      auth: authStore(),
      alert: alertStore(),
    };
  },
  methods: {
    async submit_login(e: Event) {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const query = gql`
        query sign_in($auth_input_data: AuthInputModel!) {
          auth_sign_in(auth_input_data: $auth_input_data) {
            barrier_token
          }
        }
      `;

      const { data } = await useAsyncQuery(query, {
        auth_input_data: {
          username: formData.get('username'),
          password: formData.get('password'),
        },
      });

      console.log(data.value.auth_sign_in);

      if ((data.value as any).auth_sign_in) {
        this.auth.login((data.value as any).auth_sign_in.barrier_token);
        this.alert.show('Login successful', 'success');
      } else {
        this.alert.show('Invalid credentials', 'warn');
      }
    },
  },
});
</script>

<style scoped></style>
