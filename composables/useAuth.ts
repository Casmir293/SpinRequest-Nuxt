import { toast } from "vue3-toastify";
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
        logOut();
        if (import.meta.client) {
          toast.error("User doesn't exist");
        }
        return;
      }

      USER_STORE.myProfile = docSnap.data() as MyProfile;
    } catch (err: any) {
      error.value = err;
      logger("Error fetching user ==>", error);

      if (import.meta.client) {
        const errorMsg =
          err instanceof FirebaseError
            ? `Fetch profile failed: ${err.code}`
            : `Fetch profile failed: ${err}`;
        toast.error(errorMsg);
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
      await navigateTo("/auth/login");
      if (import.meta.client) {
        toast.success("Account Created! Sign in.");
      }
    } catch (err: any) {
      error.value = err;
      logger("Error signing up ==>", error);

      if (import.meta.client) {
        const errorMsg =
          err instanceof FirebaseError
            ? `Sign up failed: ${err.code}`
            : `Sign up failed: ${err}`;
        toast.error(errorMsg);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const signIn = async (email: string, password: string) => {
    isLoading.value = true;

    try {
      const payload = await signInWithEmailAndPassword($auth, email, password);
      const idToken = await payload.user.getIdToken();

      USER_STORE.user = payload.user;
      USER_STORE.userId = payload.user.uid;
      USER_STORE.token = idToken;
      useCookie("token").value = idToken;

      await nuxtApp.runWithContext(() => navigateTo("/"));
      if (import.meta.client) {
        toast.success("Sign in successful");
      }
    } catch (err: any) {
      error.value = err;

      logger("Error signing in ==>", error);

      if (import.meta.client) {
        const errorMsg =
          err instanceof FirebaseError
            ? `Sign in failed: ${err.code}`
            : `Sign in failed: ${err}`;
        toast.error(errorMsg);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const initAuth = () => {
    try {
      onAuthStateChanged($auth, (state) => {
        USER_STORE.authState = state;
      });
    } catch (err: any) {
      error.value = err;
      logger("Error determining auth state ==>", error);

      if (import.meta.client) {
        const errorMsg =
          err instanceof FirebaseError
            ? `Auth state failed: ${err.code}`
            : `Auth state failed: ${err}`;
        toast.error(errorMsg);
      }
    }
  };

  const logOut = () => {
    nuxtApp.runWithContext(async () => {
      try {
        const cookies = ["token", "task", "user"];
        cookies.forEach((cookieName) => {
          useCookie(cookieName).value = null;
        });

        USER_STORE.resetUserData();
        await signOut($auth);

        if (import.meta.client) {
          localStorage.clear();
          sessionStorage.clear();
        }
      } catch (err: any) {
        error.value = err;
        logger("Error logging out ==>", error);

        if (import.meta.client) {
          const errorMsg =
            err instanceof FirebaseError
              ? `Logout failed: ${err.code}`
              : `Logout failed: ${err}`;
          toast.error(errorMsg);
        }
      }
    });
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
