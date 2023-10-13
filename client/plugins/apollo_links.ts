import { provideApolloClient } from '@vue/apollo-composable';
import type { ApolloClient } from '@apollo/client/core';
import { ApolloLink, from } from '@apollo/client/core';
import { alertStore } from '@/store/alert';
import { authStore } from '~/store/auth';

export default defineNuxtPlugin(({ hook }) => {
  const { clients } = useApollo();
  const default_client: ApolloClient<any> = (clients as any).default;

  const alert_link = new ApolloLink((operation, forward) => {
    return forward(operation).map((data) => {
      if (data.errors && data.errors.length) {
        const alert = alertStore();
        const error_code = data.errors[0].extensions.code;
        const error_msg = data.errors[0].message;
        alert.show(error_msg, 'warn');
      }
      return data;
    });
  });

  const auth_link = new ApolloLink((operation, forward) => {
    const auth = authStore();
    if (auth.logged_in) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      });
    }

    return forward(operation);
  });

  default_client.setLink(from([auth_link, alert_link, default_client.link]));
  provideApolloClient(default_client);

  hook('apollo:error', (error) => {
    console.error('error: ', error);
  });
});
