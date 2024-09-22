<script setup lang="ts">
import BaseMessage from '../BaseMessage.vue';
import BaseIcon from '../BaseIcon.vue';
</script>

<template>
  <BaseMessage>
    <template #icon>
      <BaseIcon :name="'check'" />
    </template>
    <template #title>
      <slot />
    </template>
  </BaseMessage>
</template>

<style scoped></style>
