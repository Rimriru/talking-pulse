import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    userName: '',
    isUserLoggedIn: false
  });

  function $reset() {
    user.value.userName = '';
    user.value.isUserLoggedIn = false;
  }

  function setUser(userName: string) {
    user.value.userName = userName;
    user.value.isUserLoggedIn = true;
  }

  return { user, $reset, setUser };
});
