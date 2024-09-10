export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  if (
    import.meta.client &&
    nuxtApp.isHydrating &&
    nuxtApp.payload.serverRendered
  )
    return;

  const excludedRoutes = ["/auth/logout"];
  const { userId, whoAmI } = useAuth();
  const token = useCookie("token").value;
  const profileID = useCookie("profileID").value;

  if (token && userId && !excludedRoutes.includes(to.path)) {
    await new Promise<void>((resolve) => {
      nuxtApp.runWithContext(() => {
        whoAmI(profileID).then(() => {
          resolve();
        });
      });
    });
  }
});
