<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="background">
    <RouterView></RouterView>
  </div>
</template>

<style>
.background {
  background-image: url('./assets/waves.svg');
  background-size: cover;
}
</style>
