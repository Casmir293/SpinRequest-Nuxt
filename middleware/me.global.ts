export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  // if (
  //   import.meta.client &&
  //   nuxtApp.isHydrating &&
  //   nuxtApp.payload.serverRendered
  // )
  //   return;

  const excludedRoutes = ["/auth/logout"];
  const { USER, userId, whoAmI } = useAuth();
  const token = useCookie("token").value;

  if (token && USER.value && !excludedRoutes.includes(to.path)) {
    await new Promise<void>((resolve) => {
      nuxtApp.runWithContext(() => {
        whoAmI(userId.value).then(() => {
          resolve();
        });
      });
    });
  }
});
