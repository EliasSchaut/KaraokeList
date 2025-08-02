export const sessionStore = defineStore('session', {
  state: (): sessionType => {
    return {
      loading: false,
    };
  },
  persist: false,
});

class sessionType {
  loading!: boolean;
}
