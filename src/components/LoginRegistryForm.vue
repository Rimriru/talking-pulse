<template>
  <form class="form" @submit.prevent="emit('submit')" autocomplete="off" novalidate>
    <div class="form-inner">
      <h1 class="greeting">Рады видеть вас вновь!&nbsp;👋</h1>
      <slot></slot>
      <button type="submit" :disabled="isSubmitButtonDisabled">Войти</button>
      <p class="form__text" v-if="isNarrowMonitor">
        Вы у нас в первый раз?
        <a class="form__link" @click="router.push('/register')">Зарегистрироваться</a>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useWindowResize from '@/composables/useWindowResize';
defineProps(['isSubmitButtonDisabled']);

const emit = defineEmits(['submit']);

const router = useRouter();

const { width } = useWindowResize();

const isNarrowMonitor = computed(() => (width.value <= 1210 ? true : false));
</script>

<style lang="scss">
@import url(../assets/styles/components/LoginRegistryForm/form.scss);
</style>
