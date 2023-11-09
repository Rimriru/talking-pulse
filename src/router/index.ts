import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import ChatPage from '@/components/ChatPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/messages',
      name: 'messages',
      component: ChatPage
    }
  ]
});

export default router;
