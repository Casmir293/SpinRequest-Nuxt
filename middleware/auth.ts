export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn.value) {
    return navigateTo("/auth/logout");
  }
});
