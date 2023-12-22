<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { useUserLogin } from '@/composables/useFirebaseAuth';
import LoginRegistryForm from '@/components/LoginRegistryForm.vue';
import TextInput from '@/components/TextInput.vue';
import InputEye from '@/components/InputEye.vue';
import LoginRegistryBg from '@/components/LoginRegistryBg.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import * as regExp from '@/utils/regExp';
import * as validationMessages from '@/utils/validationMessages';

const emailTypedIn = ref('');
const passwordTypedIn = ref('');
const isEyeOpened = ref(false);
const isLoading = ref(false);

const store = useUserStore();
const router = useRouter();

const handleLoginFormSubmit = async () => {
  isLoading.value = true;
  try {
    const user: any = await useUserLogin(emailTypedIn.value, passwordTypedIn.value);
    isLoading.value = false;
    store.setUser(user.displayName);
    router.push('/messages');
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
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
  <div class="login-registry-container">
    <LoaderComponent v-if="isLoading" />
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
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/ui/error.scss';
@use '@/assets/styles/ui/login-registry-container.scss';

.login {
  @include login-registry-block;
}
</style>
