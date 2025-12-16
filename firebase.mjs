import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebase_config = {
  // biome-ignore lint/security/noSecrets: "DOMContentLoaded" is identified as a secret false positive
  apiKey: "AIzaSyAAQ4zJb5Zz7mMG294JM0o24tjeyhg8hBI",
  authDomain: "molmap-cce48.firebaseapp.com",
  projectId: "molmap-cce48",
  storageBucket: "molmap-cce48.firebasestorage.app",
  messagingSenderId: "858681834598",
  // biome-ignore lint/security/noSecrets: "DOMContentLoaded" is identified as a secret false positive
  appId: "1:858681834598:web:c32bdb6f92ad567b7081a7",
};

const app = initializeApp(firebase_config);
export const db = getFirestore(app);
