<<<<<<< HEAD
<script setup lang="ts"></script>
=======
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
const username = ref('');

const store = useUserStore();
const router = useRouter();

const handleLoginFormSubmit = () => {
  store.setUser(username.value);
  router.push('/messages');
};
const handleUserNameInputValidation = computed(() => /[A-Za-z]{2,}/g.test(username.value));
</script>
>>>>>>> basic

<template>
  <div class="view login">
    <h1>Talking Pulse</h1>
<<<<<<< HEAD
    <form class="login-form">
      <p>Авторизация</p>
      <label for="username">
        Введите имя пользователя
        <input type="text" placeholder="Имя" />
        <button type="submit">Войти</button>
      </label>
=======
    <h2>Вдохновлённый на освоение Vue чат</h2>
    <form class="login-form" @submit.prevent="handleLoginFormSubmit">
      <div class="form-inner">
        <p>Авторизация</p>
        <label for="username">
          Введите имя пользователя
          <input type="text" v-model="username" placeholder="Имя" required />
          <button type="submit" :disabled="!handleUserNameInputValidation">Войти</button>
        </label>
      </div>
>>>>>>> basic
    </form>
  </div>
</template>
<style lang="scss">
.view {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
<<<<<<< HEAD
  background-color: #ea526f;

  &.login {
    align-items: center;
=======
  margin: 0 auto;

  &.login {
    align-items: center;
    max-width: clamp(288px, 600px, 40%);
    h1 {
      font-size: clamp(2rem, 3vw + 1rem, 4rem);
      font-family: 'Pacifico';
    }
    h2 {
      width: max-content;
      font-size: clamp(1rem, 0.2vw + 1rem, 2rem);
      font-family: 'Helvetica Neue';
    }

>>>>>>> basic
    .login-form {
      display: block;
      width: 100%;
      padding: 15px;
<<<<<<< HEAD
=======
      margin-top: 50px;
>>>>>>> basic

      .form-inner {
        display: block;
        background-color: #fff;
<<<<<<< HEAD
        padding: 50px 15px;
        border-radius: 16px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

        h1 {
          color: #aaa;
          font-size: 28px;
          margin-bottom: 30px;
=======
        padding: 50px 25px;
        border-radius: 16px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

        p {
          font-size: clamp(0.5rem, 0.3vw + 1.3rem, 2rem);
          margin-bottom: 20px;
>>>>>>> basic
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: #aaa;
<<<<<<< HEAD
          font-size: 16px;
=======
          font-size: 1rem;
>>>>>>> basic
          transition: 0.4s;
        }

        input[type='text'] {
          appearance: none;
          border: none;
          outline: none;
          background: none;

          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;

          color: #333;
          font-size: 18px;

          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;

          transition: 0.4s;

          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

<<<<<<< HEAD
        input[type='submit'] {
=======
        button[type='submit'] {
>>>>>>> basic
          appearance: none;
          border: none;
          outline: none;
          background: none;

          display: block;
          width: 100%;
          padding: 10px 15px;
<<<<<<< HEAD
          background-color: #ea526f;
          border-radius: 8px;

          color: #fff;
          font-size: 18px;
          font-weight: 700;
=======
          background-color: #ffc04c;
          border-radius: 8px;

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
>>>>>>> basic
        }

        &:focus-within {
          label {
<<<<<<< HEAD
            color: #ea526f;
=======
            color: #c38f2c;
>>>>>>> basic
          }

          input[type='text'] {
            background-color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);

            &::placeholder {
              color: #666;
            }
          }
        }
      }
    }
  }
}
</style>
