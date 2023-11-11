<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { push, set } from '@firebase/database';
import { messagesRef } from '../db';

const store = useUserStore();
const router = useRouter();

const logout = () => {
  router.push('/login');
  store.$reset();
};

const messages = ref([]);
const message = ref('');

const sendMessage = () => {
  if (message.value) {
    const userMessage = {
      username: store.user.userName,
      message: message.value
    };
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      userMessage
    });
    message.value = '';
  } else {
    return;
  }
};
</script>

<template>
  <div class="view chat">
    <header>
      <button class="logout" @click="logout">Выйти</button>
      <h1>Привет, {{ store.user.userName }}!</h1>
    </header>
    <section class="chat-box"></section>
    <footer>
      <form @submit.prevent="sendMessage">
        <input type="text" v-model="message" placeholder="Начните писать..." />
        <button type="submit"></button>
      </form>
    </footer>
  </div>
</template>

<style lang="scss">
.view {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;

  &.chat {
    flex-direction: column;
    max-width: clamp(288px, 600px, 40%);
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;

      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: gray;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;

        opacity: 1;
        transition: opacity 0.3s ease-in-out;

        &:hover {
          opacity: 0.6;
        }
      }

      h1 {
        color: black;
      }
    }

    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;

      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 999px;

            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }

        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;

          .message-inner {
            max-width: 75%;

            .content {
              color: #fff;
              font-weight: 600;
              background-color: #ea526f;
            }
          }
        }
      }
    }

    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);

      form {
        display: flex;
        gap: 15px;
        align-items: center;

        input[type='text'] {
          flex: 1 1 100%;

          appearance: none;
          border: none;
          outline: none;
          background: none;

          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;

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

        button[type='submit'] {
          padding: 0;
          background: no-repeat center url('../assets/send-btn.svg');
          background-size: contain;
          width: 38px;
          height: 38px;
          transform: translateY(0);
          transition: transform 0.8s ease;

          &:hover {
            transform: translateY(-3px);
          }
        }
        //appearance: none;
        //border: none;
        // outline: none;
        // background: none;

        // display: block;
        // padding: 10px 15px;
        // border-radius: 0px 8px 8px 0px;

        //background-color: #ea526f;

        // color: #fff;
        //font-size: 18px;
        // font-weight: 700;
        //}
      }
    }
  }
}
</style>
