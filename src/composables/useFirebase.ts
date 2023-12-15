import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBLwUuY8G11lC0dd0IVMJS89WoB5AV0O2U',
  authDomain: 'talking-pulse.firebaseapp.',
  projectId: 'talking-pulse',
  storageBucket: 'talking-pulse.appspot.com',
  messagingSenderId: '883778194380',
  appId: '1:883778194380:web:3cd23e7eee3eda6359ab69',
  databaseURL: 'https://talking-pulse-default-rtdb.europe-west1.firebasedatabase.app'
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ref to messages
const messagesRef = ref(database, 'messages');

export { app, messagesRef };
