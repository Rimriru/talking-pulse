<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { push, set, onValue, serverTimestamp } from '@firebase/database';
import { messagesRef } from '../../db';
import type { Messages } from './ChatPage.types';
import timeConverter from '@/utils/timeConverter';

const store = useUserStore();
const router = useRouter();

const logout = () => {
  router.push('/login');
  store.$reset();
};

const message = ref('');

const sendMessage = () => {
  if (message.value) {
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      username: store.user.userName,
      message: message.value,
      createdAt: serverTimestamp()
    });
    message.value = '';
  } else {
    return;
  }
};

onMounted(() => {
  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    const messages: Messages = [];

    Object.keys(data).forEach((key) => {
      messages.push({
        id: key,
        username: data[key].username,
        message: data[key].message,
        createdAt: data[key].createdAt
      });
    });

    store.setMessages(messages);
  });
});
</script>

<template>
  <div class="view chat">
    <header>
      <button class="logout" @click="logout">Выйти</button>
      <h1>Привет, {{ store.user.userName }}!</h1>
    </header>
    <section class="chat-box">
      <div
        v-for="message in store.messages"
        :key="message.id"
        :class="message.username === store.user.userName ? 'message current-user' : 'message'"
      >
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div
            :class="
              message.username === store.user.userName
                ? 'message-container'
                : 'message-container opposite-user'
            "
          >
            <div class="created-at">{{ timeConverter(message.createdAt) }}</div>
            <div class="content">{{ message.message }}</div>
          </div>
        </div>
      </div>
    </section>
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
    max-width: clamp(288px, 600px, 30%);
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

          .message-container {
            display: flex;
            gap: 5px;
            align-items: end;

            &.opposite-user {
              flex-direction: row-reverse;
            }
          }

          .created-at {
            font-size: 16px;
            color: #888;
          }

          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 40px;

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
              background-color: #faf5ea;
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
          background: no-repeat center url('../../assets/send-btn.svg');
          background-size: contain;
          width: 38px;
          height: 38px;
          transform: translateY(0);
          transition: transform 0.8s ease;

          &:hover {
            transform: translateY(-3px);
          }
        }
      }
    }
  }
}
</style>
