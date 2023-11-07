import { initializeApp } from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBLwUuY8G11lC0dd0IVMJS89WoB5AV0O2U',
  authDomain: 'talking-pulse.firebaseapp.com',
  projectId: 'talking-pulse',
  storageBucket: 'talking-pulse.appspot.com',
  messagingSenderId: '883778194380',
  appId: '1:883778194380:web:3cd23e7eee3eda6359ab69'
};

const database = initializeApp(firebaseConfig);

export default database;
