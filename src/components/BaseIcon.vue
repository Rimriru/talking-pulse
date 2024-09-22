<script setup lang="ts">
import { computed } from 'vue';

import CheckIcon from '@/components/icons/CheckIcon.vue';
import ErrorIcon from '@/components/icons/ErrorIcon.vue';

const icons = {
  check: CheckIcon,
  error: ErrorIcon
};

const props = defineProps<{
  name: keyof typeof icons;
  options?: [];
}>();

const iconComponent = computed(() => icons[props.name as keyof typeof icons]);
</script>

<template>
  <component :is="iconComponent" class="base-icon" />
</template>

<style scoped>
.base-icon {
  width: 24px;
  height: 24px;
}
</style>
