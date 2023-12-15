<template>
  <div class="login-registry-bg">
    <div class="to-login-or-registry">
      <p>
        <slot />
      </p>
      <button
        type="button"
        @click="props.isPlacedInLogin ? router.push('/register') : router.push('/login')"
      >
        {{ props.isPlacedInLogin ? 'Зарегистрироваться &rarr;' : 'Войти &rarr;' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps<{
  isPlacedInLogin: boolean;
}>();
</script>

<style lang="scss">
@import url(../assets/styles/components/LoginRegistryBg/loginRegistryBg.scss);
</style>
