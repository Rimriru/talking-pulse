import { app } from './useFirebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';

const auth = getAuth(app);

// registration

const useUserRegistration = (username: string, email: string, password: string) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: username
        });
      })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error.code));
      });
  });
};

// login

const useUserLogin = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        reject(new Error(errorMessage));
      });
  });
};

// sign-out

const useUserLogout = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful');
        resolve(true);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

export { useUserRegistration, useUserLogin, useUserLogout };
