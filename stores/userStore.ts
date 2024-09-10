import { ref, computed } from "vue";
import { defineStore } from "pinia";
import persist from "pinia-plugin-persistedstate";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<any | null>(null);
    const token = ref<string | null>(null);
    const authState = ref<any | null>(null);
    const userId = ref<UserId>(null);
    const myProfile = ref<MyProfile | null>(null);

    const isLoggedIn = computed(() => {
      return user.value !== null;
    });

    const updateUser = (newUser: any) => {
      user.value = newUser;
      userId.value = newUser?.uid ?? null;
    };

    const updateProfile = (profile: MyProfile) => {
      myProfile.value = profile;
    };

    const updateAuthState = (state: any) => {
      authState.value = state;
    };

    const clearUserData = () => {
      user.value = null;
      token.value = null;
      userId.value = null;
      myProfile.value = null;
      authState.value = null;
    };

    return {
      user,
      token,
      authState,
      userId,
      myProfile,
      isLoggedIn,
      updateUser,
      updateProfile,
      updateAuthState,
      clearUserData,
    };
  },
  {
    persist: true,
  },
);
