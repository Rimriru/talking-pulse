<template>
  <label :for="$props.inputId" :class="{ invalid: !$props.isValid }">
    {{ $props.labelText }}
    <input
      :id="$props.inputId"
      :type="$props.type"
      v-model="value"
      @input="emit('update:value', value)"
      :placeholder="$props.placeholder"
      autocomplete="off"
    />
    <slot></slot>
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
