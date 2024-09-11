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

    const resetUserData = () => {
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
      resetUserData,
    };
  },
  {
    persist: true,
  },
);
