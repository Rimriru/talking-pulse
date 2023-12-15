<template>
  <span class="eye" :class="{ eye_opened: isEyeOpened }" @click="emit('handleEyeClick')"></span>
</template>

<script setup lang="ts">
// Компонент для отображения и скрытия пароля
defineProps(['isEyeOpened']);
const emit = defineEmits(['handleEyeClick']);
</script>

<style lang="scss">
@import url('../assets/styles/components/InputEye/eye.scss');
</style>
