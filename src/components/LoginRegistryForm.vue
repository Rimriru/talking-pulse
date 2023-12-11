<template>
  <form class="form" @submit.prevent="emit('submit')" autocomplete="off" novalidate>
    <div class="form-inner">
      <h1 class="greeting">Рады видеть вас вновь!&nbsp;👋</h1>
      <slot></slot>
      <button type="submit" :disabled="isSubmitButtonDisabled">Войти</button>
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps(['isSubmitButtonDisabled']);

const emit = defineEmits(['submit']);
</script>

<style lang="scss">
@import url(../assets/styles/components/LoginRegistryForm/form.scss);
</style>
