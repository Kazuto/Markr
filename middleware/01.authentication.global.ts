export default defineNuxtRouteMiddleware((to) => {
  const { unauthenticated } = useAuth();

  // If unauthenticated and
  if (unauthenticated.value) {
    // trying to access login page, allow navigation
    if (to.name === "login") {
      return;
    }

    // trying to access any page except login, redirect to login
    return navigateTo({ name: "login" });
  }

  // If authenticated and accessing login page, redirect to index
  if (to.name === "login") {
    return navigateTo({ name: "index" });
  }

  // Otherwise allow navigation
  return;
});
