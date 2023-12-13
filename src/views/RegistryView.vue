<script setup lang="ts">
import { ref } from 'vue';
import LoginRegistryBg from '@/components/LoginRegistryBg.vue';
import LoginRegistryForm from '@/components/LoginRegistryForm.vue';
import TextInput from '@/components/TextInput.vue';
import InputEye from '@/components/InputEye.vue';

const isEyeOpened = ref(false);

const handleEyeClick = () => (isEyeOpened.value = !isEyeOpened.value);
</script>

<template>
  <main class="registry">
    <LoginRegistryBg :is-placed-in-login="false"> Мы знакомы? </LoginRegistryBg>
    <LoginRegistryForm :is-submit-button-disabled="true" :is-placed-in-login="false">
      <TextInput
        :input-id="'username'"
        :label-text="'Имя пользователя'"
        :placeholder="'Введите имя пользователя'"
        :type="'text'"
      />
      <TextInput
        :input-id="'email'"
        :label-text="'Email'"
        :placeholder="'Введите email'"
        :type="'email'"
      />
      <TextInput
        :input-id="'password'"
        :label-text="'Пароль'"
        :placeholder="'Введите пароль'"
        :type="isEyeOpened ? 'text' : 'password'"
      >
        <InputEye :is-eye-opened="isEyeOpened" @click="handleEyeClick" />
      </TextInput>
    </LoginRegistryForm>
  </main>
</template>

<style lang="scss">
@use '@/assets/styles/mixins.scss' as *;
.registry {
  @include login-registry-block;
}
</style>
