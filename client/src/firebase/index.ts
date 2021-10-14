import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCBm1hFIyEIWx8GTLRiiK3XlqjWxTvFd4Q',
  authDomain: 'dnd-masters.firebaseapp.com',
  projectId: 'dnd-masters',
  storageBucket: 'dnd-masters.appspot.com',
  messagingSenderId: '635640408696',
  appId: '1:635640408696:web:52c7ca3191aed1bafa5b8d',
  measurementId: 'G-NTBN5F2R0S',
};

const firebase = initializeApp(firebaseConfig);

const storage = getStorage(firebase);

export default storage;
