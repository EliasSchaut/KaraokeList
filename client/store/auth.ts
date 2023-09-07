export const authStore = defineStore('auth', {
  state: (): AuthType => {
    return {
      logged_in: false,
      token: '',
    };
  },
  actions: {
    login(token: string) {
      this.logged_in = true;
      this.token = token;
    },
    logout() {
      this.logged_in = false;
      this.token = '';
    },
  },
  persist: true,
});

class AuthType {
  logged_in!: boolean;
  token!: string;
}
