<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import LoginRegistryForm from '@/components/LoginRegistryForm.vue';
import TextInput from '@/components/TextInput.vue';
import InputEye from '@/components/InputEye.vue';
import LoginRegistryBg from '@/components/LoginRegistryBg.vue';
import * as regExp from '@/utils/constants';

const username = ref('');
const password = ref('');
const isEyeOpened = ref(false);

const store = useUserStore();
const router = useRouter();

const handleLoginFormSubmit = () => {
  store.setUser(username.value);
  router.push('/messages');
};
const handleEyeClick = () => (isEyeOpened.value = !isEyeOpened.value);
const handleUserNameInputValidation = computed(() => regExp.NAME_REG_EXP.test(username.value));
const handlePasswordInputValidation = computed(() => regExp.PASSWORD_REG_EXP.test(password.value));
const isSubmitButtonDisabled = computed(() =>
  handleUserNameInputValidation.value && handlePasswordInputValidation.value ? false : true
);
</script>

<template>
  <main class="login">
    <LoginRegistryForm
      @submit="handleLoginFormSubmit"
      :is-submit-button-disabled="isSubmitButtonDisabled"
      :is-placed-in-login="true"
    >
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
    <LoginRegistryBg :is-placed-in-login="true"> Вы у нас в первый раз? </LoginRegistryBg>
  </main>
</template>
<style lang="scss">
@use '@/assets/styles/mixins.scss' as *;
.login {
  @include login-registry-block;
}

@media screen and (max-width: 730px) {
  .login {
    margin-inline: 80px;
    width: calc(100% - 80px * 2);
  }
}

@media screen and (max-width: 500px) {
  .login {
    margin-inline: 40px;
    width: calc(100% - 40px * 2);
  }
}
</style>
