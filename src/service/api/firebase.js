// src/service/api/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3jGKZy0eKbOEiniC5OiY8ZnvYn_ST8oM",
  authDomain: "front-end-3.firebaseapp.com",
  projectId: "front-end-3",
  storageBucket: "front-end-3.appspot.com",
  messagingSenderId: "642656861615",
  appId: "1:642656861615:web:20e69647b47d187788c35a",
  measurementId: "G-8JNKNXY3Y5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const storage = getStorage(app);
export const db = getFirestore(app);

// Base URL untuk Firestore REST API
export const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;
