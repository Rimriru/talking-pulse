import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import type { Messages } from '@/components/ChatPage/ChatPage.types';

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    userName: '',
    isUserLoggedIn: false
  });

  const messages: Ref<Messages> = ref([]);

  function $reset() {
    user.userName = '';
    user.isUserLoggedIn = false;
  }

  function setUser(userName: string) {
    user.userName = userName;
    user.isUserLoggedIn = true;
  }

  function setMessages(array: Messages) {
    messages.value = array;
  }

  return { user, messages, $reset, setUser, setMessages };
});
