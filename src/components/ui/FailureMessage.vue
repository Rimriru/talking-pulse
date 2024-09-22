<script setup lang="ts">
import BaseMessage from '@/components/BaseMessage.vue';
import BaseIcon from '@/components/BaseIcon.vue';
</script>

<template>
  <BaseMessage class="failure-message">
    <template #icon>
      <BaseIcon :name="'error'" />
    </template>
    <template #message>
      <slot />
    </template>
  </BaseMessage>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;
.failure-message {
  border-radius: 10px;
  border: $red 1px solid;
  padding: 10px;
}
</style>
