// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHn-w-V70mDgovl101TtnMpfH09kumOtY',
  authDomain: 'netflix-elghalaba.firebaseapp.com',
  projectId: 'netflix-elghalaba',
  storageBucket: 'netflix-elghalaba.appspot.com',
  messagingSenderId: '1002751896235',
  appId: '1:1002751896235:web:cbee8456d1eee55407e5ee',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
