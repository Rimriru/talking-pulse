import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import ChatPage from '@/components/ChatPage/ChatPage.vue';
import { useUserStore } from '@/stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/messages',
      name: 'Messages',
      component: ChatPage
    }
  ]
});

router.beforeEach((to) => {
  const store = useUserStore();
  if (!store.user.isUserLoggedIn && to.name !== 'Login') {
    return { name: 'Login' };
  }
});

export default router;
