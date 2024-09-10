import { toast } from "vue3-toastify";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";
import { ref } from "vue";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { logger } from "../utils/helpers";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, getDoc, type Firestore } from "firebase/firestore/lite";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type Auth,
} from "firebase/auth";

export default function useAuth() {
  const nuxtApp = useNuxtApp();
  const $db = nuxtApp.$db as Firestore;
  const $auth = nuxtApp.$auth as Auth;
  const { user, userId, myProfile, isLoggedIn } = storeToRefs(useUserStore());
  const USER_STORE = useUserStore();
  const isLoading = ref(false);
  const error = ref<FirebaseError | string | null>(null);

  const whoAmI = async (userId: any) => {
    try {
      const docRef = doc($db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await logOut();
        toast.error("User doesn't exist");
        return;
      }

      USER_STORE.updateProfile(docSnap.data() as MyProfile);
    } catch (err: any) {
      error.value = err;
      await logOut();
      logger("Error fetching user ==>", error);
      if (err instanceof FirebaseError) {
        toast.error(`Fetch profile failed: ${err.code}`);
      } else {
        toast.error(`Fetch profile failed: ${err}`);
      }
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    isLoading.value = true;

    try {
      const payload = await createUserWithEmailAndPassword(
        $auth,
        email,
        password,
      );
      await setDoc(doc($db, "users", payload.user.uid), { name, email });
      navigateTo("/auth/signin");
      toast.success("Account Created! Sign in.");
    } catch (err: any) {
      error.value = err;
      logger("Error signing up ==>", error);
      if (err instanceof FirebaseError) {
        toast.error(`Sign up failed: ${err.code}`);
      } else {
        toast.error(`Sign up failed: ${err}`);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const signIn = async (email: string, password: string) => {
    isLoading.value = true;

    try {
      const payload = await signInWithEmailAndPassword($auth, email, password);
      USER_STORE.user = payload.user;
      USER_STORE.userId = payload.user.uid;
      const profileId = payload.user.uid;

      await whoAmI(profileId);
      navigateTo("/");

      toast.success("Sign in successful");
    } catch (err: any) {
      error.value = err;

      logger("Error signing in ==>", error);

      if (err instanceof FirebaseError) {
        toast.error(`Sign in failed: ${err.code}`);
      } else {
        toast.error(`Sign in failed: ${err}`);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const initAuth = () => {
    try {
      onAuthStateChanged($auth, (state) => {
        USER_STORE.updateAuthState(state);
      });
    } catch (err: any) {
      error.value = err;
      logger("Error determining auth state ==>", error);
      if (err instanceof FirebaseError) {
        toast.error(`Auth state failed: ${err.code}`);
      } else {
        toast.error(`Auth state failed: ${err}`);
      }
    }
  };

  const logOut = async () => {
    isLoading.value = true;

    try {
      USER_STORE.clearUserData();
      await signOut($auth);
      navigateTo("/auth/logout");
    } catch (err: any) {
      error.value = err;
      logger("Error logging out ==>", error);
      if (err instanceof FirebaseError) {
        toast.error(`Logout failed: ${err.code}`);
      } else {
        toast.error(`Logout failed: ${err}`);
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    USER: user,
    userId,
    myProfile,
    isLoading,
    isLoggedIn,
    whoAmI,
    signUp,
    signIn,
    initAuth,
    logOut,
  };
}
