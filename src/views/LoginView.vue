<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import LoginRegistryForm from '@/components/LoginRegistryForm.vue';
import InputEye from '@/components/InputEye.vue';

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
const handleUserNameInputValidation = computed(() => {
  return /[A-Za-z]{2,}/.test(username.value);
});
const handlePasswordInputValidation = computed(() =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password.value)
);
const isSubmitButtonDisabled = computed(() =>
  handleUserNameInputValidation.value && handlePasswordInputValidation.value ? false : true
);
</script>

<template>
  <section class="login">
    <LoginRegistryForm
      @submit="handleLoginFormSubmit"
      :is-submit-button-disabled="isSubmitButtonDisabled"
    >
      <label for="username">
        Имя пользователя
        <input
          id="username"
          type="text"
          v-model="username"
          placeholder="Введите имя пользователя"
          required
        />
      </label>
      <label for="password">
        Пароль
        <input
          id="password"
          :type="isEyeOpened ? 'text' : 'password'"
          class="password"
          v-model="password"
          placeholder="Введите пароль"
          required
        />
        <InputEye :is-eye-opened="isEyeOpened" @click="handleEyeClick" />
      </label>
    </LoginRegistryForm>
    <div class="login-bg">
      <div class="login-to-registry">
        <p>Вы у нас в первый раз?</p>
        <button type="button" @click="router.push('/register')">Зарегистрироваться &rarr;</button>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.login {
  display: flex;
  margin: auto;
  width: clamp(288px, 60vw, 75%);
  height: 650px;
  border-radius: 16px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  background-color: rgb(248, 230, 175);
  overflow: hidden;

  .login-bg {
    background-image: url('../assets/images/waves.svg');
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;

    .login-to-registry {
      margin: auto;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3);
      text-align: center;

      p {
        font-size: 1.2rem;
        margin-bottom: 10px;
      }

      button {
        color: #000000;
        border: #a86917 1px solid;
        border-radius: 20px;
        padding-block: 10px;
        width: clamp(200px, 5vw, 65%);
        opacity: 1;
        transition: all 0.3s ease-in-out;

        &:hover {
          opacity: 0.6;
          border: #f53333 1px solid;
        }
      }
    }
  }
}
</style>
