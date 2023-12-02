<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
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
const handleUserNameInputValidation = computed(() => /[A-Za-z]{2,}/g.test(username.value));
const handlePasswordInputValidation = computed(() =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(password.value)
);
const isSubmitButtonDisabled = () =>
  handleUserNameInputValidation.value && handlePasswordInputValidation.value ? false : true;
</script>

<template>
  <div class="login">
    <!-- <h1>Talking Pulse</h1>
    <h2>Вдохновлённый на освоение Vue чат</h2> -->
    <form class="login-form" @submit.prevent="handleLoginFormSubmit" autocomplete="off" novalidate>
      <div class="form-inner">
        <h1 class="greeting">Рады видеть вас вновь! 👋</h1>
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
          <span class="eye" :class="{ 'eye-opened': isEyeOpened }" @click="handleEyeClick"></span>
        </label>
        <button type="submit" :disabled="isSubmitButtonDisabled">Войти</button>
      </div>
    </form>
  </div>
</template>
<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 12rem;
  align-items: center;
  max-width: clamp(288px, 600px, 30%);
  // h1 {
  // font-size: clamp(2rem, 3vw + 1rem, 4rem);
  // font-family: 'Pacifico';
  // }
  h2 {
    width: max-content;
    font-size: clamp(1rem, 0.2vw + 1rem, 2rem);
  }

  .login-form {
    display: block;
    width: 100%;
    padding: 15px;
    margin-top: 50px;

    .form-inner {
      display: block;
      background-color: #fff;
      padding: 50px 25px;
      border-radius: 16px;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

      .greeting {
        font-size: clamp(0.5rem, 0.3vw + 1.3rem, 2rem);
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 20px;
        color: #aaa;
        font-size: 1rem;
        transition: 0.4s;
        position: relative;

        &:focus-within {
          color: #c38f2c;

          input {
            background-color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);

            &::placeholder {
              color: #666;
            }
          }
        }

        input {
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 10px;
          border: #c0bfbf 1px solid;
          position: relative;

          color: #333;
          font-size: 18px;

          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);

          transition: 0.4s;

          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }
      }

      .eye {
        background-image: url('../assets/eye-closed.svg');
        background-size: contain;
        background-repeat: no-repeat;
        width: 28px;
        height: 11px;

        position: absolute;
        top: 42px;
        right: 8px;
        cursor: pointer;

        &.eye-opened {
          background-image: url('../assets/eye-opened.svg');
          width: 25px;
          height: 25px;
          top: 35px;
          right: 12px;
        }
      }

      button[type='submit'] {
        display: block;
        width: 70%;
        padding: 10px 15px;
        background-color: #ffc04c;
        border-radius: 8px;
        margin-inline: auto;

        color: #fff;
        font-size: 1.1rem;
        font-weight: 500;
        transition: background-color 0.5s ease;

        &:hover:enabled {
          background-color: #f5b133;
        }

        &:disabled {
          opacity: 0.6;
          cursor: auto;
        }
      }
    }
  }
}
</style>
