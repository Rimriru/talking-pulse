<template>
  <form class="form" @submit.prevent="emit('submit')" autocomplete="off" novalidate>
    <div class="form-inner">
      <h1 class="greeting">
        {{
          $props.isPlacedInLogin ? 'Рады видеть вас вновь!&nbsp;' : 'Давайте познакомимся!&nbsp;'
        }}👋
      </h1>
      <slot></slot>
      <button type="submit" :disabled="isSubmitButtonDisabled">
        {{ $props.isPlacedInLogin ? 'Войти' : 'Зарегистрироваться' }}
      </button>
      <p class="form__text" v-if="isNarrowMonitor">
        {{ $props.isPlacedInLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?' }}
        <a
          class="form__link"
          @click="$props.isPlacedInLogin ? router.push('/register') : router.push('/login')"
          >{{ $props.isPlacedInLogin ? 'Зарегистрироваться' : 'Войти' }}</a
        >
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useWindowResize from '@/composables/useWindowResize';
defineProps<{
  isSubmitButtonDisabled: boolean;
  isPlacedInLogin: boolean;
}>();

const emit = defineEmits(['submit']);

const router = useRouter();

const { width } = useWindowResize();

const isNarrowMonitor = computed(() => (width.value <= 850 ? true : false));
</script>

<style lang="scss">
@import url(../assets/styles/components/LoginRegistryForm/form.scss);
</style>
