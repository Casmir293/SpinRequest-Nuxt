import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.VITE_FIREBASE_API_KEY as string,
    authDomain: config.public.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: config.public.VITE_FIREBASE_PROJECT_ID as string,
    storageBucket: config.public.VITE_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: config.public
      .VITE_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: config.public.VITE_FIREBASE_APP_ID as string,
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  return {
    provide: {
      auth,
      db,
    },
  };
});
