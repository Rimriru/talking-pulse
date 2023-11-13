import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Messages } from '@/components/ChatPage/ChatPage.types';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    userName: '',
    isUserLoggedIn: false
  });

  const messages: Ref<Messages> = ref([]);

  function $reset() {
    user.value.userName = '';
    user.value.isUserLoggedIn = false;
  }

  function setUser(userName: string) {
    user.value.userName = userName;
    user.value.isUserLoggedIn = true;
  }

  function setMessages(array: Messages) {
    messages.value = array;
  }

  return { user, messages, $reset, setUser, setMessages };
});
