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
    <!-- <h1>Talking Pulse</h1>
    <h2>Вдохновлённый на освоение Vue чат</h2> -->
    <form class="login-form" @submit.prevent="handleLoginFormSubmit" autocomplete="off" novalidate>
      <div class="form-inner">
        <h1 class="greeting">Рады видеть вас вновь!&nbsp;👋</h1>
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
          <span class="eye" :class="{ eye_opened: isEyeOpened }" @click="handleEyeClick"></span>
        </label>
        <button type="submit" :disabled="isSubmitButtonDisabled">Войти</button>
      </div>
    </form>
    <div class="login-bg">
      <div class="login-to-registry">
        <p>Вы у нас в первый раз?</p>
        <button type="button" @click="router.push('/registry')">Зарегистрироваться &rarr;</button>
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
  // h1 {
  // font-size: clamp(2rem, 3vw + 1rem, 4rem);
  // font-family: 'Pacifico';
  // }

  .login-form {
    flex: 1 0 400px;
    padding: 6rem 15px 15px;
    background-color: #fff;

    .form-inner {
      display: block;
      padding: 50px 25px;

      .greeting {
        font-size: clamp(0.5rem, 0.3vw + 1.3rem, 1.8rem);
        margin-bottom: 20px;
        width: max-content;
      }

      label {
        display: block;
        margin-bottom: 30px;
        color: #aaa;
        font-size: 1rem;
        line-height: 1.5rem;
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
        top: 45px;
        right: 8px;
        cursor: pointer;

        &.eye_opened {
          background-image: url('../assets/eye-opened.svg');
          width: 25px;
          height: 25px;
          top: 36px;
          right: 12px;
        }
      }

      button[type='submit'] {
        display: block;
        width: clamp(200px, 5vw, 65%);
        padding: 10px 15px;
        background-color: #ffc04c;
        border-radius: 10px;
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

  .login-bg {
    background-image: url('../assets/waves.svg');
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
