<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import LoginRegistryForm from '@/components/LoginRegistryForm.vue';
import TextInput from '@/components/TextInput.vue';
import InputEye from '@/components/InputEye.vue';
import LoginRegistryBg from '@/components/LoginRegistryBg.vue';
import * as regExp from '@/utils/regExp';
import * as validationMessages from '@/utils/validationMessages';

const emailTypedIn = ref('');
const passwordTypedIn = ref('');
const isEyeOpened = ref(false);

//const store = useUserStore();
const router = useRouter();

const handleLoginFormSubmit = () => {
  //store.setUser(username.value);
  router.push('/messages');
};
const handleEyeClick = () => (isEyeOpened.value = !isEyeOpened.value);
const editEmail = (val: string) => {
  emailTypedIn.value = val;
};
const editPassword = (val: string) => {
  passwordTypedIn.value = val;
};

// Login form validation

const passwordValidation = (value: string) => regExp.PASSWORD_REG_EXP.test(value);

const validationRules = {
  emailTypedIn: {
    required: helpers.withMessage(validationMessages.REQUIRED_VALIDATION_ERROR, required),
    email: helpers.withMessage(validationMessages.EMAIL_VALIDATION_ERROR, email)
  },
  passwordTypedIn: {
    required: helpers.withMessage(validationMessages.REQUIRED_VALIDATION_ERROR, required),
    passwordValidation: helpers.withMessage(
      validationMessages.PASSWORD_VALIDATION_ERROR,
      passwordValidation
    )
  }
};

const v$ = useVuelidate(validationRules, { emailTypedIn, passwordTypedIn }, { $autoDirty: true });
</script>

<template>
  <main class="login">
    <LoginRegistryForm
      @submit="handleLoginFormSubmit"
      :is-submit-button-disabled="v$.$invalid"
      :is-placed-in-login="true"
    >
      <TextInput
        :input-id="'email'"
        :label-text="'Email'"
        :placeholder="'Введите email'"
        :type="'email'"
        :is-valid="!v$.emailTypedIn.$error"
        @update:value="editEmail"
      />
      <span class="error" :class="{ error_visible: v$.emailTypedIn.$error }">{{
        v$.emailTypedIn.$error ? v$.emailTypedIn.$errors[0].$message : ''
      }}</span>
      <TextInput
        :input-id="'password'"
        :label-text="'Пароль'"
        :placeholder="'Введите пароль'"
        :type="isEyeOpened ? 'text' : 'password'"
        :is-valid="!v$.passwordTypedIn.$error"
        @update:value="editPassword"
      >
        <InputEye :is-eye-opened="isEyeOpened" @click="handleEyeClick" />
      </TextInput>
      <span
        class="error"
        :class="{
          error_visible: v$.passwordTypedIn.$error
        }"
        >{{ v$.passwordTypedIn.$error ? v$.passwordTypedIn.$errors[0].$message : '' }}</span
      >
    </LoginRegistryForm>
    <LoginRegistryBg :is-placed-in-login="true"> Вы у нас в первый раз? </LoginRegistryBg>
  </main>
</template>

<style lang="scss">
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/ui/error.scss';
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
