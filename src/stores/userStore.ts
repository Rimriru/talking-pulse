import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    userName: '',
    isUserLoggedIn: false
  });

  // if (localStorage.getItem('userState') ) {
  //   user.value = JSON.parse(localStorage.getItem('userState'));
  // }

  function $reset() {
    user.value.userName = '';
    user.value.isUserLoggedIn = false;
    // localStorage.setItem('userState', JSON.stringify(user.value));
  }

  function setUser(userName: string) {
    user.value.userName = userName;
    user.value.isUserLoggedIn = true;
    // localStorage.setItem('userState', JSON.stringify(user.value));
  }

  return { user, $reset, setUser };
});
