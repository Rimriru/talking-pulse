import { createRouter, createWebHistory } from 'vue-router';
import RegistryView from '@/views/RegistryView.vue';
import LoginView from '@/views/LoginView.vue';
import ChatView from '@/views/ChatView/ChatView.vue';
import { useUserStore } from '@/stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: RegistryView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/messages',
      name: 'Messages',
      component: ChatView
    }
  ]
});

router.beforeEach((to) => {
  const store = useUserStore();
  if (!store.user.isUserLoggedIn && to.name !== 'Register' && to.name !== 'Login') {
    return { name: 'Login' };
  }
});

export default router;
