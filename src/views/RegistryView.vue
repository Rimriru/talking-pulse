<script setup lang="ts">
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers, minLength, maxLength } from '@vuelidate/validators';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import LoginRegistryBg from '@/components/LoginRegistryBg.vue';
import LoginRegistryForm from '@/components/LoginRegistryForm.vue';
import TextInput from '@/components/TextInput.vue';
import InputEye from '@/components/InputEye.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { useUserRegistration } from '@/composables/useFirebaseAuth';
import * as regExp from '@/utils/regExp';
import * as validationMessages from '@/utils/validationMessages';

const store = useUserStore();
const router = useRouter();
const isEyeOpened = ref(false);
const isLoading = ref(false);

const usernameTypedIn = ref('');
const usernameMinLength = ref(6);
const usernameMaxLength = ref(16);
const emailTypedIn = ref('');
const passwordTypedIn = ref('');

const handleEyeClick = () => (isEyeOpened.value = !isEyeOpened.value);

const handleRegistryFormSubmit = async () => {
  isLoading.value = true;
  try {
    await useUserRegistration(usernameTypedIn.value, emailTypedIn.value, passwordTypedIn.value);
    isLoading.value = false;
    store.setUser(usernameTypedIn.value);
    router.push('/messages');
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};

// Registry form validation

const usernameValidation = (value: string) => regExp.NAME_REG_EXP.test(value);
const passwordValidation = (value: string) => regExp.PASSWORD_REG_EXP.test(value);

const validationRules = {
  usernameTypedIn: {
    required: helpers.withMessage(validationMessages.REQUIRED_VALIDATION_ERROR, required),
    usernameValidation: helpers.withMessage(
      validationMessages.USERNAME_VALIDATION_ERROR,
      usernameValidation
    ),
    minLength: helpers.withMessage(
      ({ $params }) => `Минимальное количество символов – ${$params.min}`,
      minLength(usernameMinLength)
    ),
    maxLength: helpers.withMessage(
      ({ $params }) => `Максимальное количество символов – ${$params.max}`,
      maxLength(usernameMaxLength)
    )
  },
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

const v$ = useVuelidate(
  validationRules,
  { usernameTypedIn, emailTypedIn, passwordTypedIn },
  { $autoDirty: true }
);
</script>

<template>
  <div class="login-registry-container">
    <main class="registry">
      <LoaderComponent v-if="isLoading" />
      <LoginRegistryBg :is-placed-in-login="false"> Мы знакомы? </LoginRegistryBg>
      <LoginRegistryForm
        :is-submit-button-disabled="v$.$invalid"
        :is-placed-in-login="false"
        @submit="handleRegistryFormSubmit"
      >
        <TextInput
          :input-id="'username'"
          :label-text="'Имя пользователя'"
          :placeholder="'Введите имя пользователя'"
          :type="'text'"
          :is-valid="!v$.usernameTypedIn.$error"
          @update:value="(v) => (usernameTypedIn = v)"
        />
        <span class="error" :class="{ error_visible: v$.usernameTypedIn.$error }">{{
          v$.usernameTypedIn.$error ? v$.usernameTypedIn.$errors[0].$message : ''
        }}</span>
        <TextInput
          :input-id="'email'"
          :label-text="'Email'"
          :placeholder="'Введите email'"
          :type="'email'"
          :is-valid="!v$.emailTypedIn.$error"
          @update:value="(v) => (emailTypedIn = v)"
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
          @update:value="(v) => (passwordTypedIn = v)"
        >
          <InputEye :is-eye-opened="isEyeOpened" @click="handleEyeClick" />
        </TextInput>
        <span class="error" :class="{ error_visible: v$.passwordTypedIn.$error }">{{
          v$.passwordTypedIn.$error ? v$.passwordTypedIn.$errors[0].$message : ''
        }}</span>
      </LoginRegistryForm>
    </main>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/ui/login-registry-container.scss';
@use '@/assets/styles/ui/error.scss';

.registry {
  @include login-registry-block;
}
</style>
