<template>
  <label :for="$props.inputId">
    {{ $props.labelText }}
    <input
      :id="$props.inputId"
      :type="$props.type"
      v-model="username"
      @change="emit('update:username', username)"
      :placeholder="$props.placeholder"
      required
      autocomplete="off"
    />
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const username = ref('');

defineProps<{
  inputId: string;
  labelText: string;
  placeholder: string;
  type: string;
}>();

const emit = defineEmits(['update:username']);
</script>

<style lang="scss"></style>
