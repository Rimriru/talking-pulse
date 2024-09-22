<script setup lang="ts"></script>

<template>
  <div class="base-message">
    <slot name="icon" />
    <span class="base-message__message">
      <slot name="message" />
    </span>
  </div>
</template>

<style lang="scss">
.base-message {
  display: flex;
  column-gap: 15px;
  background-color: #fff;

  .base-icon {
    flex-shrink: 0;
  }
}
</style>
