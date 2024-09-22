<template>
  <label :for="inputId" :class="{ invalid: !isValid }">
    {{ labelText }}
    <input
      :id="inputId"
      :type="type"
      v-model="value"
      @input="emit('update:value', value)"
      :placeholder="placeholder"
    />
    <slot />
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');

defineProps<{
  inputId: string;
  labelText: string;
  placeholder: string;
  type: string;
  isValid: boolean;
}>();

const emit = defineEmits(['update:value']);
</script>

<style lang="scss"></style>
