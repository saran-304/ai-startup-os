import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDp8pt_dOhL4Y6rmIOIFfe8r93svwYHGxo",
  authDomain: "ai-startup-os-2603b.firebaseapp.com",
  projectId: "ai-startup-os-2603b",
  storageBucket: "ai-startup-os-2603b.firebasestorage.app",
  messagingSenderId: "670932725289",
  appId: "1:670932725289:web:135c13337e04dd16513638",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;